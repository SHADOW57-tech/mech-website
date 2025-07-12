// src/layouts/AdminLayout.jsx
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/bookings", label: "Bookings" },
    { to: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold text-red-500">Admin Panel</h2>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-2 py-1 rounded transition ${
                  isActive ? "bg-red-600 text-white font-semibold" : "hover:text-red-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 text-sm text-gray-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
