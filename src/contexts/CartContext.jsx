// src/contexts/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const userId = "guest-1234"; // 🔁 Use auth.uid or anonymous ID

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Sync cart to Firebase on change
  useEffect(() => {
    if (cart.length > 0) {
      const cartRef = doc(db, "carts", userId);
      setDoc(cartRef, { items: cart }, { merge: true });
    }
  }, [cart]);

  // ✅ Load cart from Firebase on startup
  useEffect(() => {
    const loadCart = async () => {
      const cartRef = doc(db, "carts", userId);
      const snap = await getDoc(cartRef);
      if (snap.exists()) {
        setCart(snap.data().items || []);
      }
    };
    loadCart();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartItem = (id, newItem) => {
    setCart((prev) => prev.map((i) => (i.id === id ? newItem : i)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
CartProvider.displayName = "CartContext";