import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import gsap from "gsap";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userEmail = "customer@example.com"; // Replace this with real auth email if available

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "payments"),
          where("email", "==", userEmail),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    gsap.from(".order-card", {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1,
    });
  }, [orders]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-6">📦 My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-sm">Order ID: {order.orderId}</p>
                  <p className="text-xs text-gray-500">
                    {order.createdAt?.toDate().toLocaleString() || "No date"}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    order.status === "successful"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {order.cart.length} item(s) - ₦{order.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl">
            <button
              className="absolute top-2 right-3 text-red-500 font-bold text-xl"
              onClick={() => setSelectedOrder(null)}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-red-600">Order Details</h3>
            <p className="text-sm text-gray-600 mb-2">Order ID: {selectedOrder.orderId}</p>
            <p className="text-sm text-gray-600 mb-4">Ref: {selectedOrder.reference}</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              {selectedOrder.cart.map((item, index) => (
                <li key={index}>- {item.name} x{item.quantity || item.qty}</li>
              ))}
            </ul>
            <p className="font-bold text-right text-green-700">
              Total: ₦{selectedOrder.amount.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
