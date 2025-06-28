// Enhanced AdminBookings.jsx with all features
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { saveAs } from "file-saver";
import toast, { Toaster } from "react-hot-toast";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    });
    return () => unsubscribe();
  }, []);

  const handleComplete = async (id) => {
    await updateDoc(doc(db, "bookings", id), { status: "completed" });
    toast.success("Marked as completed");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    toast.success("Deleted booking successfully");
  };

  const downloadCSV = () => {
    const rows = [
      ["Name", "Phone", "Car Model", "Issue", "Status", "Date"],
      ...bookings.map((b) => [
        b.name,
        b.phone,
        b.carModel,
        b.issueType,
        b.status || "pending",
        b.createdAt?.toDate().toLocaleString() || ""
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "bookings.csv");
  };

  const filteredBookings = bookings
    .filter((b) =>
      statusFilter === "all" ? true : (b.status || "pending") === statusFilter
    )
    .filter(
      (b) =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.carModel?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <Toaster />
      <h2 className="text-xl font-bold mb-6">📋 Admin Bookings</h2>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name or car model"
          className="border px-4 py-2 rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border px-4 py-2 rounded"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={downloadCSV}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {paginatedBookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-4 rounded mb-4 shadow-sm bg-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Car:</strong> {booking.carModel}</p>
              <p><strong>Issue:</strong> {booking.issueType}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`font-semibold ${
                  booking.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}>
                  {booking.status || "pending"}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Date:</strong> {booking.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              {booking.status !== "completed" && (
                <button
                  onClick={() => handleComplete(booking.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => handleDelete(booking.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
