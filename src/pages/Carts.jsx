import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import {  } from "framer-motion";


const dummyCart = [
  { id: 1, name: "Brake Pads", price: 12000, qty: 1 },
  { id: 2, name: "Oil Filter", price: 5500, qty: 2 },
];

export default function Carts() {
  const [cart, setCart] = useState(dummyCart);
  const [loading, setLoading] = useState(true);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    useEffect(() => {
    const delay = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(delay);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen"><Loader/></div>;

  return (
    <motion.section>
    <section className="px-4 py-16 bg-white text-black max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">₦{item.price.toLocaleString()} × {item.qty}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="font-bold text-xl mt-6">
            Total: ₦{total.toLocaleString()}
          </div>

          <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded">
            Checkout
          </button>
        </div>
      )}
    </section>
    </motion.section>
  );
}
