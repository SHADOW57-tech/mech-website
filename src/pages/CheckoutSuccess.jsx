import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/"); // 🔐 redirect if no order found
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-white px-4 py-12 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6 text-gray-800">
        <h2 className="text-3xl font-bold text-green-700 text-center">✅ Order Successful!</h2>

        <div className="bg-gray-50 shadow rounded-lg p-6 space-y-4 border border-green-200">
          <div>
            <p className="font-semibold">Order ID:</p>
            <p>{order.orderId}</p>
          </div>

          <div>
            <p className="font-semibold">Name:</p>
            <p>{order.customerName}</p>
          </div>

          <div>
            <p className="font-semibold">Email:</p>
            <p>{order.email}</p>
          </div>

          <div>
            <p className="font-semibold">Payment Method:</p>
            <p className="capitalize">{order.method}</p>
          </div>

          {order.deliveryAddress && (
            <div>
              <p className="font-semibold">Delivery Address:</p>
              <p>{order.deliveryAddress}</p>
            </div>
          )}

          <div>
            <p className="font-semibold">Total Paid:</p>
            <p className="text-xl font-bold text-red-600">
              ₦{Number(order.amount).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="font-semibold">Items:</p>
            <ul className="list-disc ml-6 space-y-1">
              {order.cart.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.quantity || 1} — ₦
                  {(item.price * (item.quantity || 1)).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
