import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const liveOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(liveOrders);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Status:</strong> {order.completed ? "✅ Done" : "⏳ Pending"}</p>
              </div>
              {/* Example Buttons */}
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                  Mark as Completed
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
