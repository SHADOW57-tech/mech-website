import { useCart } from "./../contexts/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Details:", { cart, form });
    clearCart();
    alert("Order submitted successfully!");
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
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="payment"
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
