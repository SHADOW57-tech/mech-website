// /pages/admin/AdminOrders.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const fetchedOrders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(fetchedOrders.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
  };

  const markAsDelivered = async (id) => {
    await updateDoc(doc(db, "orders", id), {
      status: "delivered",
    });
    fetchOrders(); // Refresh
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Admin Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow bg-white">
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Amount:</strong> ₦{order.amount?.toLocaleString()}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 font-semibold ${order.status === "paid" ? "text-green-600" : order.status === "pending" ? "text-yellow-600" : "text-blue-600"}`}>
                {order.status}
              </span>
            </p>
            <button
              onClick={() => markAsDelivered(order.id)}
              className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded"
              disabled={order.status === "delivered"}
            >
              Mark as Delivered
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
