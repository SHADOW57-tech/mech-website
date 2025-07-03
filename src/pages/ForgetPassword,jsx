import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("📧 Reset link sent to your email");
      navigate("/login");
    } catch (err) {
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Forgot Password</h2>
      <p className="text-gray-600 mb-4">
        Enter your email and we'll send you a password reset link.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleReset}
        disabled={loading}
        className={`bg-red-600 text-white px-4 py-2 w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
}
