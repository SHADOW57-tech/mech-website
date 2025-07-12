import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalBookings: 0,
    todayOrders: 0,
    totalRevenue: 0,
  });

  const [orders, setOrders] = useState([]);

  // 📊 Fetch stats
  const fetchStats = async () => {
    const ordersSnap = await getDocs(collection(db, "orders"));
    const bookingsSnap = await getDocs(collection(db, "bookings"));

    const allOrders = ordersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const allBookings = bookingsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const today = dayjs().format("YYYY-MM-DD");

    const completedOrders = allOrders.filter((o) => o.status === "completed");
    const pendingOrders = allOrders.filter((o) => o.status !== "completed");
    const todayOrders = allOrders.filter((o) => {
      const date = o.createdAt?.toDate?.();
      return date && dayjs(date).format("YYYY-MM-DD") === today;
    });

    const totalRevenue = allOrders.reduce((acc, order) => {
      if (order.cart) {
        return (
          acc +
          order.cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
        );
      }
      return acc;
    }, 0);

    setStats({
      totalOrders: allOrders.length,
      completedOrders: completedOrders.length,
      pendingOrders: pendingOrders.length,
      totalBookings: allBookings.length,
      todayOrders: todayOrders.length,
      totalRevenue,
    });
  };

  // 🧾 Fetch orders for status control
  const fetchOrders = async () => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(data);
  };

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("✅ Status updated");
    } catch (err) {
      toast.error("❌ Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Admin Dashboard</h1>

      {/* ✅ STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value={stats.totalOrders} color="bg-blue-100" />
        <StatCard label="Completed Orders" value={stats.completedOrders} color="bg-green-100" />
        <StatCard label="Pending Orders" value={stats.pendingOrders} color="bg-yellow-100" />
        <StatCard label="Today’s Orders" value={stats.todayOrders} color="bg-purple-100" />
        <StatCard label="Total Bookings" value={stats.totalBookings} color="bg-orange-100" />
        <StatCard label="Total Revenue (₦)" value={`₦${stats.totalRevenue.toLocaleString()}`} color="bg-gray-100" />
      </div>

      {/* ✅ ORDER STATUS UPDATE PANEL */}
      <h2 className="text-xl font-semibold mt-10">Manage Order Status</h2>
      <div className="space-y-4 mt-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="font-bold">#{order.orderId}</p>
              <p className="text-sm text-gray-500">
                {order.customerName} — ₦{order.amount?.toLocaleString()} — {order.method}
              </p>
              <p className="text-xs text-gray-400">{dayjs(order.createdAt?.toDate?.()).format("MMM D, YYYY h:mm A")}</p>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-medium">Status:</span>{" "}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "delivered"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {order.status}
                </span>
              </p>
            </div>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              className="mt-3 md:mt-0 border p-2 rounded text-sm"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`p-4 rounded shadow ${color}`}>
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
