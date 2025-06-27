// src/pages/CheckoutSuccess.jsx
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-green-600">✅ Order Placed!</h1>
        <p className="text-gray-700">Thank you! Your order is being processed.</p>
        <Link to="/" className="text-red-600 underline">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
