import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

export default function Carts() {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [deliveryLocation, setDeliveryLocation] = useState("Lagos");
  const [animKey, setAnimKey] = useState(0); // used to trigger animation

  // ✅ Quantity controls
  const increaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    updateCartItem(id, { ...item, quantity: (item.quantity || 1) + 1 });
    setAnimKey((prev) => prev + 1);
    toast.success("Increased quantity!");
  };

  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item.quantity > 1) {
      updateCartItem(id, { ...item, quantity: item.quantity - 1 });
      setAnimKey((prev) => prev + 1);
      toast.success("Decreased quantity!");
    }
  };

  // ✅ Remove item
  const handleRemove = (id) => {
    removeFromCart(id);
    setAnimKey((prev) => prev + 1);
    toast.success("Item removed from cart!");
  };

  // ✅ Calculations
  const itemCount = cart.reduce((sum, i) => sum + (i.quantity || i.qty || 1), 0);
  const totalAmount = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity || item.qty || 1);
    return sum + price * qty;
  }, 0);

  const estimatedTax = Math.round(totalAmount * 0.075);
  const locationFees = {
    Lagos: 2000,
    Abuja: 3500,
    Other: 5000,
  };
  const locationFee = locationFees[deliveryLocation] || locationFees.Other;
  const perItemFee = 500;
  const dynamicShippingFee = locationFee + itemCount * perItemFee;
  const grandTotal = totalAmount + estimatedTax + dynamicShippingFee;

  const loading = false;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <motion.section
      key={animKey}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <section className="px-4 py-16 bg-white text-black max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-base">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₦{Number(item.price).toLocaleString()} x {item.quantity || item.qty} ={" "}
                    <span className="font-medium text-black">
                      ₦{(item.price * (item.quantity || item.qty)).toLocaleString()}
                    </span>
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center">
                      {item.quantity || item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Delivery location selector */}
            <div className="mt-6">
              <label className="block mb-1 font-medium">Delivery Location:</label>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Subtotal Breakdown */}
            <div className="mt-6 text-sm text-right space-y-1 border-t pt-4">
              <p>Subtotal: ₦{totalAmount.toLocaleString()}</p>
              <p>Estimated Tax (7.5%): ₦{estimatedTax.toLocaleString()}</p>
              <p>
                Shipping Fee ({deliveryLocation} + {itemCount} items): ₦
                {dynamicShippingFee.toLocaleString()}
              </p>
              <p className="text-lg font-bold text-green-700 pt-2">
                Total: ₦{grandTotal.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded w-full text-lg font-semibold mt-4"
            >
              🛒 Checkout ({itemCount} items)
            </button>
          </div>
        )}
      </section>
    </motion.section>
  );
}