import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0)
    : 0;

  // 🔥 Initial entrance animation
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // 🔥 Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Cart badge bounce
  useEffect(() => {
    if (cartCount > 0 && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.7 },
        { scale: 1.2, duration: 0.3, ease: "back.out(3)" }
      );
    }
  }, [cartCount]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book", href: "/book" },
    { name: "Parts", href: "/parts" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/80 backdrop-blur-md py-2 shadow-lg"
            : "bg-gray-700 py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link
            to="/"
            className={`font-bold transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            } text-red-600`}
          >
            SIR P AUTO
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative transition text-white ${
                  location.pathname === link.href
                    ? "text-red-500"
                    : "hover:text-red-500"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link to="/cart" className="relative flex items-center">
              <ShoppingCart className="w-6 h-6 hover:text-red-500 transition" />
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
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 text-white flex justify-around items-center py-2 z-50 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`flex-1 text-center text-sm transition ${
              location.pathname === link.href
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="/cart"
          className="flex-1 text-center text-sm relative hover:text-red-500"
        >
          Cart
          {cartCount > 0 && (
            <span
              ref={badgeRef}
              className="absolute top-0 right-4 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full"
            >
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Spacer so content doesn’t hide behind fixed navbar */}
      <div className="h-50"></div>
    </>
  );
}