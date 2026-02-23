import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

export default function Carts() {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryLocation, setDeliveryLocation] = useState("Lagos");
  const [exactAddress, setExactAddress] = useState("");
  const [animKey, setAnimKey] = useState(0);

 const increaseQty = (id) => {
  const item = cart.find((i) => i.id === id);
  const newQty = (item.quantity || 1) + 1;
  updateCartItem(id, newQty); // ✅ just the number
  setAnimKey((prev) => prev + 1);
  toast.success("Increased quantity!");
};

const decreaseQty = (id) => {
  const item = cart.find((i) => i.id === id);
  if ((item.quantity || 1) > 1) {
    const newQty = item.quantity - 1;
    updateCartItem(id, newQty); // ✅ just the number
    setAnimKey((prev) => prev + 1);
    toast.success("Decreased quantity!");
  }
};


  const handleRemove = (id) => {
    removeFromCart(id);
    setAnimKey((prev) => prev + 1);
    toast.success("Item removed from cart!");
  };

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
      <section className="px-4 py-16 bg-gray-500 text-white max-w-3xl mx-auto">
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
                <div className="flex gap-4">
                  {/* ✅ Product Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  )}

                  <div>
                    <p className="font-semibold text-base">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₦{Number(item.price).toLocaleString()} x{" "}
                      {item.quantity || item.qty} ={" "}
                      <span className="font-medium text-black">
                        ₦
                        {(item.price * (item.quantity || item.qty)).toLocaleString()}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-slate-700 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="min-w-[20px] text-center">
                        {item.quantity || item.qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 bg-slate-700 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
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

            {/* ✅ Clear Cart Button */}
            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared!");
              }}
              className="w-full bg-slate-700 hover:bg-gray-300 text-sm py-2 rounded mt-4"
            >
              Clear Cart
            </button>

            {/* Delivery location and exact address */}
            <div className="mt-6">
              <label className="block mb-1 font-medium">Delivery Location:</label>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full p-2 border rounded bg-slate-700 "
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Other">Other</option>
              </select>

              <label className="block mt-4 mb-1 font-medium">Exact Delivery Address:</label>
              <textarea
                value={exactAddress}
                onChange={(e) => setExactAddress(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded resize-none bg-slate-700"
                placeholder="Enter house number, street, landmarks, etc."
              />
            </div>

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
              onClick={() => {
                if (!exactAddress.trim()) {
                  toast.error("Please enter your exact delivery address");
                  return;
                }
                navigate("/checkout", {
                  state: { deliveryLocation, exactAddress },
                });
              }}
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
