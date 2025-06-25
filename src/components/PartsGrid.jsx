import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PartsGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const items = gridRef.current.querySelectorAll(".part-item");

    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Sample dummy data (replace with actual parts)
  const parts = [
    { id: 1, name: "Brake Pads", price: "₦12,000" },
    { id: 2, name: "Oil Filter", price: "₦3,500" },
    { id: 3, name: "Spark Plug", price: "₦2,000" },
    { id: 4, name: "Battery", price: "₦45,000" },
    { id: 5, name: "Air Filter", price: "₦6,200" },
    { id: 6, name: "Wiper Blades", price: "₦3,000" },
    { id: 7, name: "Fuel Pump", price: "₦18,000" },
    { id: 8, name: "Timing Belt", price: "₦10,000" },
    { id: 9, name: "Radiator", price: "₦25,000" },
    { id: 10, name: "Headlight Bulb", price: "₦1,500" },
    { id: 11, name: "Tail Light Bulb", price: "₦1,200" },
    { id: 12, name: "Brake Fluid", price: "₦2,500" },
    { id: 13, name: "Coolant", price: "₦3,000" },
    { id: 14, name: "Transmission Fluid", price: "₦4,000" },
    { id: 15, name: "Power Steering Fluid", price: "₦3,500" },
    { id: 16, name: "Clutch Kit", price: "₦20,000" },
  ];

  return (
    <section
      ref={gridRef}
      className="py-16 px-4 bg-gray-50 text-black max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        Genuine Car Parts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div
            key={part.id}
            className="part-item bg-white shadow-md p-4 rounded-lg text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{part.name}</h3>
            <p className="text-red-600 font-bold">{part.price}</p>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
