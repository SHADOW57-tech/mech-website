import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import  {useProducts}  from "../contexts/ProductContext";
import allData from "../data/PartsData"; // Your original array

export default function Parts() {
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedParts, setUploadedParts] = useState([]);
  const sectionRef = useRef(null);
  const cartRef = useRef(null);
  const { products } = useProducts(); // These are products from Sell page
   // Combine with original parts

  // Fetch seller-uploaded items from localStorage
  useEffect(() => {
    const savedUploads = JSON.parse(localStorage.getItem("uploadedParts")) || [];
    setUploadedParts(savedUploads);
  }, []);

  // Combine original parts with uploaded ones
const combinedParts = [
  ...allData,         // original array from PartsData
  ...products,        // products from Sell page
  ...uploadedParts    // seller-uploaded items from localStorage
];
// Remove duplicates by id (keep the first occurrence)
const uniqueParts = Array.from(
  new Map(combinedParts.map(part => [part.id, part])).values()
);
  // Filter based on search
  const filteredParts = uniqueParts.filter((part) =>
part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleAddToCart = (part) => {
    addToCart({ ...part, quantity: 1 });
    toast.success("Item added successfully to cart!");
    if (cartRef.current) {
      gsap.fromTo(
        cartRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.out" }
      );
    }
  };

  return (
    <section ref={sectionRef} className="py-4 px-4 bg-gray-300 text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Order Car Parts
        </h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search parts..."
            className="w-full max-w-md mx-auto border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredParts.map((part) => (
            <div
              key={`${part.id}-${part.name}`}
              className="bg-white rounded-xl shadow p-4 transition-transform duration-300 transform hover:scale-105"
            >
              <Link to={`/parts/${part.id}`} className="block w-full">
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-full h-40 object-cover rounded transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-lg font-semibold mt-4 text-gray-800">{part.name}</h3>
                <p className="text-red-600 font-bold mt-1">
                  ₦{Number(part.price).toLocaleString()}
                </p>
              </Link>
              <button
                onClick={() => handleAddToCart(part)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Floating Cart Info */}
        {cart.length > 0 && (
          <div
            ref={cartRef}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl px-6 py-3 rounded-full flex items-center gap-4 border"
          >
            <span className="text-sm font-medium text-gray-700">
              🛒 {totalItems} item{totalItems > 1 ? "s" : ""}
            </span>
            <span className="text-sm font-semibold text-green-600">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
