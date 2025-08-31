import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';

export default function SellerDashboard() {
  const [form, setForm] = useState({ name: '', price: '', category: '', image: null });
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth(); 

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-700">
        <p>You must be logged in to access this page.</p>
        <Link to="/login" className="text-blue-600 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error("Please select an image");

    try {
      setUploading(true);

      // Upload to Firebase Storage
      const imageRef = ref(storage, `products/${Date.now()}-${form.image.name}`);
      await uploadBytes(imageRef, form.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Add product to Firestore
      await addDoc(collection(db, 'products'), {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        imageUrl,
        createdAt: serverTimestamp(),
        sellerId: user.uid,
      });

      toast.success('✅ Product uploaded successfully on firebase database');
      setForm({ name: '', price: '', category: '', image: null });
    } catch (err) {
      console.error(err);
      toast.error('❌ Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">🛒 Seller Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="image"
          onChange={handleChange}
          type="file"
          accept="image/*"
          className="w-full"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {uploading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
}
