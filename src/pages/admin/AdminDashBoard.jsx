import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    };

    fetchData();
  }, []);

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📋 All Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded shadow border hover:shadow-md transition"
            >
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Phone:</strong> {b.phone}</p>
              <p><strong>Car:</strong> {b.carModel}</p>
              <p><strong>Issue:</strong> {b.issueType}</p>
              <p><strong>Description:</strong> {b.issueDesc}</p>
              {b.imageUrl && (
                <img
                  src={b.imageUrl}
                  alt="Issue"
                  className="mt-2 w-40 rounded border"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                Submitted on:{" "}
                {b.createdAt?.toDate().toLocaleString() || "Loading..."}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
