// We'll build each of the 3 features step by step.
// Step 1: Add PDF invoice generation

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const fetchedOrders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(fetchedOrders);
  };

  const markAsDelivered = async (id) => {
    await updateDoc(doc(db, "orders", id), {
      status: "delivered",
      deliveredAt: Timestamp.now(),
    });
    toast.success("✅ Order marked as delivered");
    fetchOrders();
  };

  const downloadCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Email", "Amount", "Status", "Date"],
      ...filteredOrders.map((order) => [
        order.orderId,
        order.customerName,
        order.email,
        order.amount,
        order.status,
        order.createdAt?.toDate().toLocaleString() || "",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "orders.csv");
  };

  const downloadPDF = (order) => {
    const doc = new jsPDF();
    doc.text("ICS AutoFix - Invoice", 14, 20);
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.orderId}`, 14, 30);
    doc.text(`Customer: ${order.customerName}`, 14, 35);
    doc.text(`Email: ${order.email}`, 14, 40);
    doc.text(`Status: ${order.status}`, 14, 45);
    doc.text(`Amount: ₦${order.amount?.toLocaleString()}`, 14, 50);
    doc.text(`Date: ${order.createdAt?.toDate().toLocaleString()}`, 14, 55);

    const items = order.cart?.map((item) => [
      item.name,
      item.quantity,
      `₦${item.price.toLocaleString()}`,
      `₦${(item.price * item.quantity).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["Item", "Qty", "Unit Price", "Total"]],
      body: items,
    });

    doc.save(`Invoice_${order.orderId}.pdf`);
  };

  const filteredOrders = orders
    .filter((o) =>
      statusFilter === "all" ? true : o.status === statusFilter
    )
    .filter(
      (o) =>
        o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = sortKey === "amount" ? a.amount : a.createdAt?.seconds;
      const bVal = sortKey === "amount" ? b.amount : b.createdAt?.seconds;
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 text-red-600">📦 Admin Orders</h2>

      {/* Filters & Sorting */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search by name or order ID"
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
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="delivered">Delivered</option>
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="createdAt">Sort by Newest</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <button
          onClick={downloadCSV}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow bg-white space-y-2">
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Amount:</strong> ₦{order.amount?.toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                order.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : order.status === "delivered"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {order.status}
              </span>
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => downloadPDF(order)}
                className="px-3 py-1 text-sm bg-gray-700 text-white rounded"
              >
                Download Invoice
              </button>
              <button
                onClick={() => markAsDelivered(order.id)}
                disabled={order.status === "delivered" || order.status === "pending"}
                className={`px-3 py-1 text-sm rounded ${
                  order.status === "delivered" || order.status === "pending"
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {order.status === "delivered"
                  ? "Already Delivered"
                  : order.status === "pending"
                  ? "Awaiting Payment"
                  : "Mark as Delivered"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
}
