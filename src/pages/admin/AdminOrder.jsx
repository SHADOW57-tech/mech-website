import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("placedAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded shadow border hover:shadow-md transition"
            >
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>

              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity} — ₦{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-2"><strong>Total:</strong> ₦{order.total}</p>
              <p className="text-sm text-gray-500 mt-2">
                Placed on: {order.placedAt?.toDate().toLocaleString() || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
