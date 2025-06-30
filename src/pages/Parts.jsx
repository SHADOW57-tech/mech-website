import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import { gsap } from "gsap";

export default function Parts() {
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);
  const cartRef = useRef(null); // for animation

  const parts = [
    { id: 1, name: "Brake Pads", price: 12000, image: "/images/brake-pads.jpg", type: "Brakes" },
    { id: 2, name: "Oil Filter", price: 5500, image: "/images/oil-filter.jpg", type: "Engine" },
    { id: 3, name: "Air Filter", price: 6200, image: "/images/air-filter.jpg", type: "Engine" },
    { id: 4, name: "Battery", price: 45000, image: "/images/battery.jpg", type: "Electrical" },
    { id: 5, name: "Wiper Blades", price: 3000, image: "/images/wiper.jpg", type: "Exterior" },
    { id: 6, name: "Spark Plug", price: 2800, image: "/images/spark-plug.jpg", type: "Engine" },
    { id: 7, name: "Fuel Pump", price: 18000, image: "/images/fuel-pump.jpg", type: "Fuel System" },
    { id: 8, name: "Timing Belt", price: 10000, image: "/images/timing-belt.jpg", type: "Engine" },
    { id: 9, name: "Radiator", price: 25000, image: "/images/radiator.jpg", type: "Cooling System" },
    { id: 10, name: "Headlight Bulb", price: 1500, image: "/images/headlight-bulb.jpg", type: "Electrical" },
    { id: 11, name: "Tail Light Bulb", price: 1200, image: "/images/tail-light-bulb.jpg", type: "Electrical" },
    { id: 12, name: "Brake Fluid", price: 2500, image: "/images/brake-fluid.jpg", type: "Brakes" },
    { id: 13, name: "Coolant", price: 3000, image: "/images/coolant.jpg", type: "Cooling System" },
    { id: 14, name: "Transmission Fluid", price: 4000, image: "/images/transmission-fluid.jpg", type: "Transmission" },
    { id: 15, name: "Power Steering Fluid", price: 3500, image: "/images/power-steering-fluid.jpg", type: "Steering" },
    { id: 16, name: "Clutch Kit", price: 20000, image: "/images/clutch-kit.jpg", type: "Transmission" },
  ];

  const filteredParts = parts.filter((part) =>
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

    // ✅ Optional: Animate cart info on add
    if (cartRef.current) {
      gsap.fromTo(
        cartRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.out" }
      );
    }
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Order Car Parts
        </h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search parts..."
            className="w-full max-w-md mx-auto grid-cols-2 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <div
                key={part.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
              >
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-4">{part.name}</h3>
                <p className="text-red-600 font-bold mt-1">
                  ₦{part.price.toLocaleString()}
                </p>
                <button
                  onClick={() => handleAddToCart(part)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No matching parts found.
            </p>
          )}
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
