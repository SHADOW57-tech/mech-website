import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Import } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Parts() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
   const sectionRef = useRef(null);

  const parts = [
    { id: 1, name: "Brake Pads", price: "₦12,000", image: "/images/brake-pads.jpg", type: "Brakes" },
    { id: 2, name: "Oil Filter", price: "₦5,500", image: "/images/oil-filter.jpg", type: "Engine" },
    { id: 3, name: "Air Filter", price: "₦6,200", image: "/images/air-filter.jpg", type: "Engine" },
    { id: 4, name: "Battery", price: "₦45,000", image: "/images/battery.jpg", type: "Electrical" },
    { id: 5, name: "Wiper Blades", price: "₦3,000", image: "/images/wiper.jpg", type: "Exterior" },
    { id: 6, name: "Spark Plug", price: "₦2,800", image: "/images/spark-plug.jpg", type: "Engine" },
    { id: 7, name: "Fuel Pump", price: "₦18,000", image: "/images/fuel-pump.jpg", type: "Fuel System" },
    { id: 8, name: "Timing Belt", price: "₦10,000", image: "/images/timing-belt.jpg", type: "Engine" },
    { id: 9, name: "Radiator", price: "₦25,000", image: "/images/radiator.jpg", type: "Cooling System" },
    { id: 10, name: "Headlight Bulb", price: "₦1,500", image: "/images/headlight-bulb.jpg", type: "Electrical" },
    { id: 11, name: "Tail Light Bulb", price: "₦1,200", image: "/images/tail-light-bulb.jpg", type: "Electrical" },
    { id: 12, name: "Brake Fluid", price: "₦2,500", image: "/images/brake-fluid.jpg", type: "Brakes" },
    { id: 13, name: "Coolant", price: "₦3,000", image: "/images/coolant.jpg", type: "Cooling System" },
    { id: 14, name: "Transmission Fluid", price: "₦4,000", image: "/images/transmission-fluid.jpg", type: "Transmission" },
    { id: 15, name: "Power Steering Fluid", price: "₦3,500", image: "/images/power-steering-fluid.jpg", type: "Steering" },
    { id: 16, name: "Clutch Kit", price: "₦20,000", image: "/images/clutch-kit.jpg", type: "Transmission" },
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

  return (
    <section className="py-16 px-4 bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Order Car Parts
        </h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search parts..."
            className="w-full max-w-md mx-auto block border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Parts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
                <p className="text-red-600 font-bold mt-1">{part.price}</p>
              <button onClick={() => addToCart(part)} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
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
      </div>
    </section>
  );
}
