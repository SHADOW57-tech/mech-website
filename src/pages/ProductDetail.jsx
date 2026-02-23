import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import allParts from "../data/PartsData";
import toast from "react-hot-toast";
import Parts from "./Parts";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allParts.find((p) => p.id === parseInt(id));

  if (!product) return <p className="p-8">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-10 md:p-10 shadow-2xl bg-white rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg max-h-[500px]"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4 ">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-red-600 text-2xl font-semibold">
            ₦{product.price.toLocaleString()}
          </p>

          {product.desc && (
            <p className="text-gray-700 text-base leading-relaxed">
              {product.desc}
            </p>
          )}

          <button
            onClick={() => {
              addToCart({ ...product, quantity: 1 });
              toast.success(`${product.name} successfully added to cart`);
            }}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
