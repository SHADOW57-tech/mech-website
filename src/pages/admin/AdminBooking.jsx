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
import dayjs from "dayjs";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📦 Fetch bookings in real time
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

  // ✅ Actions
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
        b.name || "",
        b.phone || "",
        b.carModel || "",
        b.issueType || "",
        b.status || "pending",
        b.createdAt?.toDate
          ? dayjs(b.createdAt.toDate()).format("YYYY-MM-DD HH:mm")
          : "",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "bookings.csv");
  };

  // 🔍 Filter & Paginate
  const filteredBookings = bookings
    .filter((b) =>
      statusFilter === "all" ? true : (b.status || "pending") === statusFilter
    )
    .filter((b) =>
      [b.name, b.carModel]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-red-600">🔧 Admin Bookings</h2>

      <div className="flex flex-wrap gap-4 items-center mb-6">
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

        <div className="ml-auto">
          <button
            onClick={downloadCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {paginatedBookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-4 rounded mb-4 shadow-sm bg-white"
        >
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="text-sm space-y-1">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Car:</strong> {booking.carModel}</p>
              <p><strong>Issue:</strong> {booking.issueType}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`inline-block px-2 py-1 text-xs rounded ${
                  booking.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {booking.status || "pending"}
                </span>
              </p>
              <p className="text-gray-500 text-xs">
                <strong>Date:</strong>{" "}
                {booking.createdAt?.toDate
                  ? dayjs(booking.createdAt.toDate()).format("YYYY-MM-DD HH:mm")
                  : "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {booking.status !== "completed" && (
                <button
                  onClick={() => handleComplete(booking.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => handleDelete(booking.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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
