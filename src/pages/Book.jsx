import { useState } from "react";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    carModel: "",
    issue: "",
    preferredDate: "",
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Repair booked successfully!");
    // TODO: send data to backend or Firebase
  };

  return (
    <section className="py-16 px-4 bg-white text-black">
      <div className="max-w-xl mx-auto shadow-md p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Book a Car Repair
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Car Model</label>
            <input
              type="text"
              name="carModel"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Problem Description</label>
            <textarea
              name="issue"
              rows="4"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Preferred Date</label>
            <input
              type="date"
              name="preferredDate"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Upload Car Photo (Optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </section>
  );
}
