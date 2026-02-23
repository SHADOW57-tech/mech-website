import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";
import wiperblade from "../images/wiperblade.jpg";
import  Brakepad from "../images/break-pad.png"
import Oilfilter from "../images/oil-filter.png"
import Sparkplug from "../images/spark-plug.png"
import Battery from "../images/battery.png"
import Airfilter from "../images/air-filter.png"

gsap.registerPlugin(ScrollTrigger);

export default function PartsGrid() {
  const gridRef = useRef(null);
  const { addToCart } = useCart(); // ✅ get cart handler

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

  const parts = [
    { id: 1, name: "Brake Pads", price: 12000, image: Brakepad },
    { id: 2, name: "Oil Filter", price: 3500, image: Oilfilter },
    { id: 3, name: "Spark Plug", price: 2000, image: Sparkplug },
    { id: 4, name: "Battery", price: 45000, image: Battery },
    { id: 5, name: "Air Filter", price: 6200, image: Airfilter },
    { id: 6, name: "Wiper Blade", price: 3000, image: wiperblade },
  ];

  const handleAdd = (part) => {
    addToCart({ ...part, quantity: 1 });
    toast.success(`${part.name} successfully added to cart`);
  };

  return (
    <section
      ref={gridRef}
      className="py-16 px-4 bg-gray-500 text-white max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        Genuine Car Parts
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div
            key={part.id}
            className="part-item bg-black shadow-md p-4 rounded-lg text-center transform transition duration-300 hover:shadow-xl hover:bg-gray-400"
          >
            {part.image && (
              <img
                src={part.image}
                alt={part.name}
                className="w-full h-40 object-cover rounded transition-transform duration-300 hover:scale-105"
              />
            )}
            <h3 className="text-lg font-semibold">{part.name}</h3>
            <p className="text-red-600 font-bold">
              ₦{part.price.toLocaleString()}
            </p>

            {/* ✅ Improved Button Colors */}
            <button
              className="w-full mt-4 bg-[#FF3B3B] text-white px-4 py-2 rounded font-semibold shadow-md hover:bg-red-700 hover:shadow-red-400/40 transition"
              onClick={() => handleAdd(part)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
