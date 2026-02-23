import React, { useState } from "react";
import allData from "../data/PartsData";

export default function Parts() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Update user info fields
  const handleUserChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // WhatsApp order function
  const handleWhatsAppOrder = (part) => {
    const message = `🛒 *AUTO PART ORDER*

Part: ${part.name}
Price: ₦${Number(part.price).toLocaleString()}

👤 Name: ${userInfo.name || "Not provided"}
📞 Phone: ${userInfo.phone || "Not provided"}
📍 Address: ${userInfo.address || "Not provided"}
`;

    const phoneNumber = "2348060077529"; // Your WhatsApp number
    const whatsappURL =
      "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  };

  // Filter parts based on search term
  const filteredParts = allData.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 px-4 bg-gray-500 text-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#B22222] mb-8">
          Order Car Parts
        </h2>

           {/* ===================== USER INFO ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border px-4 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-500"
            value={userInfo.name}
            onChange={handleUserChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full border px-4 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-500"
            value={userInfo.phone}
            onChange={handleUserChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            className="w-full border px-4 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-500"
            value={userInfo.address}
            onChange={handleUserChange}
          />
        </div>

        {/* ===================== SEARCH BAR ===================== */}
        <div className="mb-8 max-w-md mx-auto w-full">
          <input
            type="text"
            placeholder="Search for a part..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
          />
        </div>

        {/* ===================== PARTS GRID ===================== */}
        {filteredParts.length === 0 ? (
          <p className="text-center text-gray-100 text-lg">
            No parts found for "{searchTerm}"
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredParts.map((part) => (
              <div
                key={part.id}
                className="bg-black text-white rounded-xl shadow-md p-4 transition-transform duration-300 transform hover:scale-105"
              >
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-full h-40 object-cover rounded transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-lg font-semibold mt-4">{part.name}</h3>
                <p className="text-red-600 font-bold mt-1">
                  ₦{Number(part.price).toLocaleString()}
                </p>

                <button
                  onClick={() => handleWhatsAppOrder(part)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition-colors duration-300"
                >
                  Order via WhatsApp
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
