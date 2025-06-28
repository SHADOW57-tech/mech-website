import { useState } from "react";
import MapComponent from "../components/MapComponent";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Message sent successfully!");
    // TODO: Send to backend or email service (like EmailJS or Firebase)
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="bg-white py-16 px-4 text-black">
      <div className="max-w-xl mx-auto shadow-md p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
         <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Our Workshop Location</h2>
      <MapComponent />
    </div>
    </section>
  );
}
