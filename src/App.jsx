import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CartProvider from "./contexts/CartContext";
import "./index.css";
import { AnimatePresence } from "framer-motion";

// Import your pages
import Home from "../src/pages/Home";
import Parts from "../src/pages/Parts";
import Book from "../src/pages/Book";
import Cart from "./pages/Carts";
import CheckOut from "./pages/CheckOut";
import FloatingButtons from "./components/FloatButton";
import Contact from "./pages/Contact";
import CartSummary from "./components/CartSummary";
import PageWrapper from "./components/PageWrapper";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <Home />
              <FloatingButtons />
            </>
          }
        />
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/book"
          element={
            <PageWrapper>
              <Book />
            </PageWrapper>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageWrapper>
              <CheckOut />
            </PageWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <PageWrapper>
              <Cart />
            </PageWrapper>
          }
        />
        <Route
          path="/parts"
          element={
            <PageWrapper>
              <Parts />
            </PageWrapper>
          }
        />

        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="/cartsummary"
          element={
            <PageWrapper>
              <CartSummary />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
