// pages/CheckoutSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-green-600">✅ Order Successful!</h1>
        <p className="text-gray-700">
          Thank you for your order. We’ll process and deliver it soon.
        </p>
        <p className="text-sm text-gray-400">Redirecting to homepage in 5 seconds...</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Go to Homepage Now
        </button>
      </div>
    </div>
  );
}
