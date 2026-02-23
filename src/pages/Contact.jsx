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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Submitted:", formData);

      setIsSubmitting(false);
      setIsSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section className="bg-gray-100 py-20 px-4 text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE - FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

          <h2 className="text-3xl font-bold mb-2">
            Get in Touch
          </h2>

          <p className="text-gray-500 mb-6">
            Fill out the form and we’ll get back to you soon.
          </p>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
              ✅ Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <input
              type="tel"
              name="phone"
              required
              placeholder="+234..."
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <textarea
              name="message"
              rows="4"
              required
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>


        {/* RIGHT SIDE - CONTACT INFO + MAP */}
        <div className="space-y-8">

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

            <h3 className="text-xl font-bold mb-4">
              Contact Information
            </h3>

            <div className="space-y-3 text-gray-600">
              <p>📍 Lagos, Nigeria</p>
              <p>📞 +234 800 000 0000</p>
              <p>📧 support@email.com</p>
              <p>🕒 Mon - Sat: 8AM - 6PM</p>
            </div>

          </div>


          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">

            <h3 className="text-lg font-bold mb-4">
              Our Location
            </h3>

            <MapComponent />

          </div>

        </div>

      </div>
    </section>
  );
}
