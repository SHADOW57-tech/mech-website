import "./App.css";
import "./index.css";

import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./AnimatedRoutes";
import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-right" />
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait" initial={false}>
        <AnimatedRoutes location={location} />
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      
        <AppContent />
      
    </CartProvider>
  );
}

export default App;
