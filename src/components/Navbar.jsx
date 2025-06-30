import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const badgeRef = useRef(null); // 👈 for animation
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0)
    : 0;

  // 👇 Animate cart badge when cartCount changes
  useEffect(() => {
    if (cartCount > 0 && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0.6 },
        { scale: 1.2, opacity: 1, duration: 0.3, ease: "bounce.out" }
      );
    }
  }, [cartCount]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book Repair", href: "/book" },
    { name: "Order Parts", href: "/parts" },
    { name: "My Orders", href: "/my-orders" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header ref={headerRef} className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-red-600">
          SIR P AUTO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-red-500 transition"
            >
              {link.name}
            </Link>
          ))}

          <Link to="/cartsummary" className="relative flex items-center">
            <ShoppingCart className="w-6 h-6 text-white hover:text-red-500 transition" />
            {cartCount > 0 && (
              <span
                ref={badgeRef}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full"
              >
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-black px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-center block py-2 text-base hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cartsummary"
            onClick={() => setIsOpen(false)}
            className="text-center block mt-2 py-2 text-base font-medium hover:text-red-500"
          >
            🛒 View Cart ({cartCount})
          </Link>
        </div>
      )}
    </header>
  );
}
