import { useState } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "../components/MapComponent";

export default function Contact() {
  const location = useLocation();
  const part = location.state?.part;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: part ? `I'm interested in ${part.name}` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending
    setTimeout(() => {
      console.log("Submitted:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="bg-gray-100 py-20 px-4 text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE - FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-6">
            Fill out the form and we’ll get back to you as soon as possible.
          </p>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
              ✅ Message sent successfully! We’ll contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                placeholder="+234..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - CONTACT INFO + MAP */}
        <div className="space-y-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-600">
              <p>📍 123 Workshop Street, Lagos</p>
              <p>📞 +234 800 000 0000</p>
              <p>📧 support@yourdomain.com</p>
              <p>🕒 Mon - Sat: 8:00AM - 6:00PM</p>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4">
              Our Workshop Location
            </h3>
            <MapComponent />
          </div>
        </div>

      </div>
    </section>
  );
}