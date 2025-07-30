import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./contexts/CartContext"; // ✅ Import the CartProvider
import { ProductProvider } from "./contexts/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
