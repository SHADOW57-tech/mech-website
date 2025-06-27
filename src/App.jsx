import { useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";

import { AnimatePresence } from "framer-motion";
import CartProvider from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./AnimatedRoutes";// Move routes logic here (Step 2 below)

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait">
        <AnimatedRoutes location={location} key={location.pathname} />
      </AnimatePresence>
    </>
  );
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      {!isAdminPage && <Navbar />}
      <AnimatedRoutes />
    </CartProvider>
  );
}

export default App;
