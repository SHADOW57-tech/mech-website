export default function FloatingButtons() {
  return (
    <div
      className="
        fixed z-50
        flex gap-3 items-center
        p-2 rounded-full shadow-xl

        top-96 left-1/2 -translate-x-1/2 my-10
        md:top-96 md:left-1/3 md:bottom-auto my-16
        md:-translate-y-1/2 md:translate-x-0
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

      {/* Chat Us */}
      <a
        href="https://wa.me/2348121018756"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full shadow text-sm flex items-center justify-center"
      >
        <span className="text-lg">💬</span>
        <span className="hidden md:inline ml-2">Chat Us</span>
      </a>
    </div>
  );
}
