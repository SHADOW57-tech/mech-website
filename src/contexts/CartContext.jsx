import { createContext, useContext, useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false); // ✅ Flag to prevent overwriting
  const userId = "guest-1234";

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartRef = doc(db, "carts", userId);
        const snap = await getDoc(cartRef);
        if (snap.exists()) {
          setCart(snap.data().items || []);
        }
        setIsCartLoaded(true); // ✅ Allow saving only after load is done
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };
    loadCart();
  }, [userId]);

  // Save cart to Firestore when cart updates and it's already been loaded
  useEffect(() => {
    if (!isCartLoaded) return;

    const saveCart = async () => {
      try {
        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, { items: cart });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };

    saveCart();
  }, [cart, userId, isCartLoaded]);

  // Add to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
