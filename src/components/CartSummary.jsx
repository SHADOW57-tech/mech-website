import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function CartSummary() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const listRef = useRef([]);

  useEffect(() => {
    // Animate items in when cart updates
    gsap.from(listRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [cart]);

  if (!cart.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-center text-gray-500 text-lg">Your cart is empty 💤</p>
      </div>
    );
  }

  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity ?? i.qty), 0);

  const handleRemove = (id, name) => {
    const index = cart.findIndex((item) => item.id === id);
    const itemRef = listRef.current[index];

    gsap.to(itemRef, {
      opacity: 0,
      x: 50,
      duration: 0.3,
      onComplete: () => {
        removeFromCart(id);
        toast.success(`${name} removed from cart`);
      },
    });
  };

  const handleCheckout = () => {
    toast.success("Redirecting to checkout...");
    navigate("/checkout");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        Cart Summary
      </h2>

      <ul className="space-y-4">
        {cart.map((item, idx) => (
          <li
            key={item.id}
            ref={(el) => (listRef.current[idx] = el)}
            className="flex items-center gap-4 border-b pb-3"
          >
            {/* Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded"
              />
            )}

            {/* Info */}
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₦{Number(item.price).toLocaleString()} × {item.quantity ?? item.qty}
              </p>
              <p className="text-sm font-semibold text-green-700">
                = ₦{(item.price * (item.quantity ?? item.qty)).toLocaleString()}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.id, item.name)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="mt-6 text-right text-lg font-bold text-green-700">
        Total: ₦{total.toLocaleString()}
      </div>

      {/* Checkout */}
      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded transition font-semibold"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
