import React, { useState, useEffect } from "react";

const Sell = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [userProducts, setUserProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userProducts");
    if (stored) setUserProducts(JSON.parse(stored));
  }, []);

  // Save to localStorage when userProducts change
  useEffect(() => {
    localStorage.setItem("userProducts", JSON.stringify(userProducts));
  }, [userProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProduct((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price) return alert("Fill required fields");
    const newProduct = { ...product, id: Date.now() };
    setUserProducts((prev) => [...prev, newProduct]);
    setProduct({ name: "", description: "", price: "", image: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sell Your Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Product
        </button>
      </form>

      {userProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Your Uploaded Products</h3>
          <div className="grid grid-cols-2 gap-4">
            {userProducts.map((item) => (
              <div key={item.id} className="border p-2 rounded">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2" />
                )}
                <h4 className="font-bold">{item.name}</h4>
                <p>{item.description}</p>
                <p className="text-green-600 font-bold">₦{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sell;
