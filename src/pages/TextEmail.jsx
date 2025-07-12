// pages/TestEmail.jsx
import React from "react";
import { sendOrderEmail } from "../utility/SendOrderEmail"; // ✅ adjust the path if needed

export default function TestEmail() {
  const handleTestSend = () => {
    sendOrderEmail({
      customerName: "Test User",
      email: "youremail@example.com", // replace with your real email
      orderId: "ORD-123456",
      amount: 30000,
      cart: [
        { name: "Brake Pads", quantity: 2, price: 5000 },
        { name: "Engine Oil", quantity: 1, price: 20000 },
      ],
      method: "card",
      deliveryAddress: "No. 12 Engine Street, Lagos",
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">📩 Test EmailJS Order</h2>
      <button
        onClick={handleTestSend}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Send Test Email
      </button>
    </div>
  );
}
