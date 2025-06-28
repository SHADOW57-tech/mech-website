import { Facebook, Instagram, PhoneCall, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";



export default function Footer() {
  const footerRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);
  return (
    <footer className="bg-black text-white py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">SIR P AUTO</h2>
          <p className="text-sm text-gray-300">
            Reliable repairs. Quality parts. Fast service. We bring your car back to life with ease.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-500">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-400">Home</Link></li>
            <li><Link to="/book" className="hover:text-red-400">Book Repair</Link></li>
            <li><Link to="/parts" className="hover:text-red-400">Order Parts</Link></li>
            <li><Link to="/cart" className="hover:text-red-400">View Cart</Link></li>
            <li><Link to="/contact" className="hover:text-red-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-500">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <PhoneCall size={16} /> <a href="tel:+2348000000000">+234 812 101 8756</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <a href="mailto:Nwobupeter2021@gmail.Com">Nwobupeter2021@gmail.Com</a>
            </li>
            
            <li className="flex items-center gap-2">
              <Instagram size={16} /> <a href="#">@mechanichero</a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook size={16} /> <a href="#">/mechanichero</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Mechanic Hero Garage. All rights reserved.
      </div>
    </footer>
  );
}
