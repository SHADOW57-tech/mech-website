// src/components/CartDrawer.jsx
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 z-50 border-l border-gray-200 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h3 className="font-bold text-lg">Your Cart</h3>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="border-b pb-2">
              <div className="font-semibold text-sm">{item.name}</div>
              <div className="text-xs text-gray-600">
                ₦{Number(item.price).toLocaleString()} x {item.quantity} =
                <span className="ml-1 font-bold text-black">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 mt-2 items-center">
                <button
                  onClick={() =>
                    updateCartItem(item.id, {
                      ...item,
                      quantity: item.quantity - 1 || 1,
                    })
                  }
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartItem(item.id, {
                      ...item,
                      quantity: item.quantity + 1,
                    })
                  }
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 ml-auto text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="font-bold mb-2 text-sm">
            Total: ₦{totalAmount.toLocaleString()}
          </div>
          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded text-sm font-semibold"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
