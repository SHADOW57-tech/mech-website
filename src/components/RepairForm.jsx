import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function RepairForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    issueType: "",
    issueDesc: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!/^\d{11,14}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `repair_images/${Date.now()}-${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "bookings"), {
      ...formData,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    navigate("/booking-success");
  } catch (err) {
    console.error("Error submitting booking:", err);
  }
};

  return (
    <section className="py-16 px-4 bg-white text-black max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
        Book a Repair
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input
          type="text"
          name="carModel"
          placeholder="Car Model / Year"
          className="w-full border px-4 py-2 rounded"
          value={formData.carModel}
          onChange={handleChange}
        />
        {errors.carModel && (
          <p className="text-red-500 text-sm">{errors.carModel}</p>
        )}

        <select
          name="issueType"
          className="w-full border px-4 py-2 rounded"
          value={formData.issueType}
          onChange={handleChange}
        >
          <option value="">Select Problem Area</option>
          <option>Engine</option>
          <option>Brakes</option>
          <option>Transmission</option>
          <option>Electrical</option>
        </select>
        {errors.issueType && (
          <p className="text-red-500 text-sm">{errors.issueType}</p>
        )}

        <textarea
          name="issueDesc"
          placeholder="Describe the issue"
          className="w-full border px-4 py-2 rounded"
          rows={4}
          value={formData.issueDesc}
          onChange={handleChange}
        />

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block font-medium">Upload Car Issue Photo (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded px-2 py-1"
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
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded w-full"
        >
          Submit Repair Request
        </button>
      </form>
    </section>
  );
}
