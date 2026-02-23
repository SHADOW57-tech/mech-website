export default function FloatingButtons() {

  const whatsappNumber = "2348060077529";

  const orderMessage = `AUTO PARTS ORDER

Customer Name:
Phone Number:
Location (State & City):

Product:
Quantity:

Payment Method:
Pay on Delivery

Notes:
`;

  const encodedMessage = encodeURIComponent(orderMessage);

  return (
    <div
      className="
        fixed z-50
        flex gap-3 items-center mt-40
        rounded-full shadow-xl m-auto
        top-96 mt-10 left-1/2 -translate-x-1/2
      "
    >

      {/* Book Repair */}
      <a
        href="/book"
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full shadow text-sm flex items-center justify-center"
      >
        <span className="text-lg">🛠️</span>
        <span className="hidden md:inline ml-2">Book Repair</span>
      </a>


      {/* Order Parts */}
      <a
        href="/parts"
        className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-full shadow text-sm flex items-center justify-center"
      >
        <span className="text-lg">🔩</span>
        <span className="hidden md:inline ml-2">Order Parts</span>
      </a>


      {/* Call Us */}
      <a
        href="tel:+2348121018756"
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-full shadow text-sm flex items-center justify-center"
      >
        <span className="text-lg">📞</span>
        <span className="hidden md:inline ml-2">Call Us</span>
      </a>


      {/* Professional WhatsApp Order */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full shadow text-sm flex items-center justify-center"
      >
        <span className="text-lg">💬</span>
        <span className="hidden md:inline ml-2">
          Order on WhatsApp
        </span>
      </a>

    </div>
  );
}
