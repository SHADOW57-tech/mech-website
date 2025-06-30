import { useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <p className="text-center mt-10 text-gray-500">No order found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Order Successful</h2>
      <p className="text-sm text-gray-600 mb-2">Order ID: <strong>{order.orderId}</strong></p>
      <p className="text-sm">Name: {order.customerName}</p>
      <p className="text-sm mb-4">Email: {order.email}</p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
      <ul className="space-y-2">
        {order.cart.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>{item.name} x{item.quantity}</span>
            <span>₦{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-lg font-bold text-right text-green-700">
        Total: ₦{order.amount.toLocaleString()}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Payment Method: <strong>{order.method}</strong>
      </p>
    </div>
  );
}
