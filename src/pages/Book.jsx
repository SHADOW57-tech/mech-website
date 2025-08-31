import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { sendOrderEmail } from "../utility/SendOrderEmail";

export default function RepairForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    carModel: "",
    issueType: "",
    issueDesc: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\+?(234|0)[789][01]\d{8}$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid Nigerian phone number (e.g., 08123456789)";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.carModel) newErrors.carModel = "Car model is required";
    if (!formData.issueType) newErrors.issueType = "Select an issue type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ Send admin alerts via Firebase Cloud Function
  const sendAdminAlerts = async (bookingData) => {
    try {
      const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendAdminAlerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Admin alert failed");

      console.log("✅ Admin alerts sent");
    } catch (err) {
      console.error("❌ Failed to send admin alert:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `repair_images/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const bookingData = {
        ...formData,
        imageUrl,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "bookings"), bookingData);

      await sendAdminAlerts(bookingData); // ✅ Send alerts (Cloud Function)
      await sendOrderEmail({ ...bookingData, email: "admin@example.com" }); // optional fallback

      toast.success("Booking submitted! 🎉");
      navigate("/booking-success");
    } catch (err) {
      console.error("❌ Error submitting booking:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-500 text-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Book a Repair</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input
          type="text"
          name="address"
          placeholder="Home Address"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        <input
          type="text"
          name="carModel"
          placeholder="Car Model / Year"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          value={formData.carModel}
          onChange={handleChange}
        />
        {errors.carModel && <p className="text-red-500 text-sm">{errors.carModel}</p>}

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
        </select>
        {errors.issueType && <p className="text-red-500 text-sm">{errors.issueType}</p>}

        <textarea
          name="issueDesc"
          placeholder="Describe the issue"
          className="w-full border px-4 py-2 rounded bg-slate-700"
          rows={4}
          value={formData.issueDesc}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label className="block font-medium">Upload Car Issue Photo (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded px-2 py-1 bg-yellow-500 hover:bg-yellow-700 cursor-pointer"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Issue Preview"
                className="w-full max-h-52 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="text-red-600 mt-1 underline text-sm"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          } text-white px-6 py-3 rounded w-full`}
        >
          {loading ? "Submitting..." : "Submit Repair Request"}
        </button>
      </form>
    </section>
  );
}
