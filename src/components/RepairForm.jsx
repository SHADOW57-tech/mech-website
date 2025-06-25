import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function RepairForm() {
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

    tl.fromTo(
      formRef.current.querySelector("h2"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 }
    ).fromTo(
      formRef.current.querySelectorAll("input, select, textarea"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15 },
      "-=0.4"
    ).fromTo(
      formRef.current.querySelector("button"),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1 },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={formRef}
      className="py-16 px-4 bg-white text-black max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
        Book a Repair
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Car Model / Year"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select className="w-full border px-4 py-2 rounded" required>
          <option value="">Select Problem Area</option>
          <option>Engine</option>
          <option>Brakes</option>
          <option>Transmission</option>
          <option>Electrical</option>
        </select>
        <textarea
          placeholder="Describe the issue"
          className="w-full border px-4 py-2 rounded"
          rows={4}
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded w-full"
        >
          Submit Repair Request
        </button>
      </form>
    </section>
  );
}
