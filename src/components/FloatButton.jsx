export default function FloatingButtons() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col md:flex-row gap-3 md:gap-6 items-center bg-white p-4 rounded-3xl shadow-lg">
      {/* Book Repair */}
      <a
        href="/book"
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md text-sm flex items-center justify-center"
      >
        <span role="img" aria-label="Book" className="text-lg">🛠️</span>
        <span className="hidden md:inline ml-2">Book Repair</span>
      </a>

      {/* Order Parts */}
      <a
        href="/parts"
        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded shadow-md text-sm flex items-center justify-center"
      >
        <span role="img" aria-label="Parts" className="text-lg">🔩</span>
        <span className="hidden md:inline ml-2">Order Parts</span>
      </a>

      {/* Call Us */}
      <a
        href="tel:+2347041554896"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md text-sm flex items-center justify-center"
      >
        <span role="img" aria-label="Call" className="text-lg">📞</span>
        <span className="hidden md:inline ml-2">Call Us</span>
      </a>

      {/* Chat Us (WhatsApp) */}
      <a
        href="https://wa.me/2347041554896"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md text-sm flex items-center justify-center"
      >
        <span role="img" aria-label="Chat" className="text-lg">💬</span>
        <span className="hidden md:inline ml-2">Chat Us</span>
      </a>
    </div>
  );
}