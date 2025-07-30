import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const badgeRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();

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
    { name: "Book", href: "/book" },
    { name: "Parts", href: "/parts" },
    { name: "Orders", href: "/my-orders" },
    { name: "Contact", href: "/contact" },
    { name: "Sell", href: "/sell" },
  ];

  return (
    <>
      {/* Top desktop navbar */}
      <header ref={headerRef} className="bg-black text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="text-2xl font-bold text-red-600">
            SIR P AUTO
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6 text-base font-medium">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="hover:text-red-500 transition">
                {link.name}
              </Link>
            ))}

            <Link to="/cart" className="relative flex items-center">
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
        </div>
      </header>

      {/* Fixed bottom nav bar for mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 text-white flex justify-around items-center py-2 z-50 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`flex-1 text-center text-sm hover:text-red-500 ${
              location.pathname === link.href ? "text-red-500 font-semibold" : ""
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
    </>
  );
}
