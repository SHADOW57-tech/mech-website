import { useCart } from "./../contexts/CartContext";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cash",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      customerName: form.name,
      address: form.address,
      phone: form.phone,
      paymentMethod: form.payment,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      placedAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), order);
      clearCart();
      navigate("/checkout-success");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to submit order. Try again.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          required
          value={form.address}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="cash">Cash on Delivery</option>
          <option value="transfer">Bank Transfer</option>
          <option value="card">Card Payment</option>
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded"
        >
          Place Order
        </button>
      </form>
    </section>
  );
}
