import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './contexts/CartContext'; // ✅ Import the CartProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider> {/* ✅ Wrap App in CartProvider */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
