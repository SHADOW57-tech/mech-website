// src/pages/Login.jsx
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence); // ✅ Remember Me
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("🎉 Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("🎉 Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error("❌ Google login failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Login to Your Account</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-3 w-full mb-4 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-3 w-full mb-4 rounded"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className={`bg-red-600 text-white px-4 py-3 w-full rounded font-semibold transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={handleGoogleLogin}
        className="mt-3 w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Continue with Google
      </button>

      <p
        onClick={() => navigate("/signup")}
        className="text-sm text-blue-500 mt-5 cursor-pointer hover:underline text-center"
      >
        Don’t have an account? Sign up
      </p>

      <p
        onClick={() => navigate("/forgot-password")}
        className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline text-center"
      >
        Forgot your password?
      </p>
    </div>
  );
}
