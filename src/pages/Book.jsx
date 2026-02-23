import { useState } from "react";

export default function RepairForm() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    carModel: "",
    issueType: "",
    issueDesc: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Handle Inputs
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate Form
  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\+?(234|0)[789][01]\d{8}$/;

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone =
        "Enter valid Nigerian phone (Example: 08123456789)";

    if (!formData.address) newErrors.address = "Address is required";

    if (!formData.carModel) newErrors.carModel = "Car model required";

    if (!formData.issueType)
      newErrors.issueType = "Select problem area";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Image Preview Only
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  };

  // WhatsApp Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const message = `🔧 *NEW REPAIR REQUEST*

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📍 Address: ${formData.address}

🚗 Car Model: ${formData.carModel}
⚙️ Problem Area: ${formData.issueType}

📝 Issue:
${formData.issueDesc || "Not specified"}
`;

    const phoneNumber = "2348060077529";

    const whatsappURL =
      "https://wa.me/" +
      phoneNumber +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="py-16 px-4 bg-gray-500 text-white max-w-xl mx-auto">

      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
        Book a Repair
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Home Address"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}

        {/* Car Model */}
        <input
          type="text"
          name="carModel"
          placeholder="Car Model / Year"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.carModel}
          onChange={handleChange}
        />
        {errors.carModel && (
          <p className="text-red-500 text-sm">{errors.carModel}</p>
        )}

        {/* Issue Type */}
        <select
          name="issueType"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.issueType}
          onChange={handleChange}
        >
          <option value="">Select Problem Area</option>
          <option>Engine</option>
          <option>Brakes</option>
          <option>Transmission</option>
          <option>Electrical</option>
          <option>Suspension</option>
        </select>

        {errors.issueType && (
          <p className="text-red-500 text-sm">
            {errors.issueType}
          </p>
        )}

        {/* Description */}
        <textarea
          name="issueDesc"
          placeholder="Describe the issue"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          rows={4}
          value={formData.issueDesc}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <div className="space-y-2">

          <label className="block font-medium">
            Upload Car Issue Photo (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded px-2 py-1 bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-52 object-cover rounded border"
            />
          )}

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full font-semibold"
        >
          Send Repair Request on WhatsApp
        </button>

      </form>

    </section>
  );
}
