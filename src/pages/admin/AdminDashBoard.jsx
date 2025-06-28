import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalBookings: 0,
    todayOrders: 0,
    totalRevenue: 0,
  });

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
      if (order.items) {
        return (
          acc +
          order.items.reduce((sum, item) => sum + item.price * item.qty, 0)
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

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value={stats.totalOrders} color="bg-blue-100" />
        <StatCard label="Completed Orders" value={stats.completedOrders} color="bg-green-100" />
        <StatCard label="Pending Orders" value={stats.pendingOrders} color="bg-yellow-100" />
        <StatCard label="Today’s Orders" value={stats.todayOrders} color="bg-purple-100" />
        <StatCard label="Total Bookings" value={stats.totalBookings} color="bg-orange-100" />
        <StatCard label="Total Revenue (₦)" value={`₦${stats.totalRevenue.toLocaleString()}`} color="bg-gray-100" />
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
