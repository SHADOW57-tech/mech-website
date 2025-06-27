// src/layouts/AdminLayout.jsx
import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminLayout() {

  const handleLogout = () => {
  signOut(auth);
};
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin/dashboard" className="block hover:text-red-400">Dashboard</Link>
          <Link to="/admin/bookings" className="block hover:text-red-400">Bookings</Link>
          <Link to="/admin/orders" className="block hover:text-red-400">Orders</Link>
          <Link
  to="/login"
  className="block text-sm text-gray-400 mt-10"
  onClick={handleLogout}
>
  Logout
</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
