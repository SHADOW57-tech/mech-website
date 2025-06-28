import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </section>
  );
}
