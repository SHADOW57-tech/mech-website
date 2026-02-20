import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import allData from "../data/PartsData";

export default function Parts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedParts, setUploadedParts] = useState([]);
  const sectionRef = useRef(null);
  const { products } = useProducts();

  // Fetch seller-uploaded items from localStorage
  useEffect(() => {
    const savedUploads =
      JSON.parse(localStorage.getItem("uploadedParts")) || [];
    setUploadedParts(savedUploads);
  }, []);

  // Combine original parts with uploaded ones
  const combinedParts = [
    ...allData,
    ...products,
    ...uploadedParts,
  ];

  // Remove duplicates by id
  const uniqueParts = Array.from(
    new Map(combinedParts.map((part) => [part.id, part])).values()
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

  // 🔥 Redirect to Contact Page instead of adding to cart
  const handleContactRedirect = (part) => {
    navigate("/contact", {
      state: { part },
    });
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
                <h3 className="text-lg font-semibold mt-4 text-gray-800">
                  {part.name}
                </h3>
                <p className="text-red-600 font-bold mt-1">
                  ₦{Number(part.price).toLocaleString()}
                </p>
              </Link>

              <button
                onClick={() => handleContactRedirect(part)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full transition-colors duration-300"
              >
                Contact Seller
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}