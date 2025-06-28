import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function MyOrders() {
  const [userPhone, setUserPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved phone from localStorage
  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) {
      setUserPhone(savedPhone);
      fetchOrders(savedPhone);
    }
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setUserPhone(value);
    localStorage.setItem("userPhone", value);
  };

  const fetchOrders = async (phone) => {
    setLoading(true);
    try {
      const q = query(collection(db, "orders"), where("phone", "==", phone));
      const snapshot = await getDocs(q);
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "Cancelled" });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">📦 My Orders</h2>

      <div className="mb-6">
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={userPhone}
          onChange={handlePhoneChange}
          className="border px-4 py-2 w-full rounded mb-2"
        />
        <button
          onClick={() => fetchOrders(userPhone)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          View My Orders
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded p-4 shadow bg-white space-y-2"
            >
              {order.imageUrl && (
                <img
                  src={order.imageUrl}
                  alt="Order"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <p><strong>Item:</strong> {order.partName || "N/A"}</p>
              <p><strong>Qty:</strong> {order.quantity || 1}</p>
              <p><strong>Unit Price:</strong> ₦{order.price?.toLocaleString() || "N/A"}</p>
              <p><strong>Total:</strong> ₦{(order.price * order.quantity)?.toLocaleString()}</p>
              <p><strong>Status:</strong> <span className="text-red-600">{order.status || "Pending"}</span></p>
              <p><strong>Ordered At:</strong>{" "}
                {order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>

              <div className="flex gap-4 mt-2">
                {order.status !== "Completed" && order.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="text-red-600 underline hover:font-semibold"
                  >
                    Cancel Order
                  </button>
                )}
                <button className="text-blue-600 underline hover:font-semibold">
                  Track
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
