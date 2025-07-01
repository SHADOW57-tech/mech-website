import { useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./AnimatedRoutes";
import { Toaster } from "react-hot-toast";
// import CartDisplay from "./components/CartDisplay"; // <-- Add this import

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      <Toaster position="top-right" />
      {!isAdminPage && <Navbar />}
      {/* Show cart contents for debugging */}
      {/* <CartDisplay /> */}
      <AnimatePresence mode="wait">
        <AnimatedRoutes location={location} key={location.pathname} />
      </AnimatePresence>
    </CartProvider>
  );
}

export default App;