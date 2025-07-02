import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const isFirstLoad = useRef(true);

  // ✅ Step 1: Determine user or guest cart ID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCartId(user.uid);
      } else {
        let localId = localStorage.getItem("cartId");
        if (!localId) {
          localId = `guest-${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem("cartId", localId);
        }
        setCartId(localId);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Step 2: Load cart from Firestore
  useEffect(() => {
    if (!cartId) return;
    const loadCart = async () => {
      const ref = doc(db, "carts", cartId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCart(snap.data().items || []);
        console.log("🧠 Cart loaded from Firestore:", snap.data().items);
      } else {
        console.log("🆕 No existing cart found, starting fresh.");
      }
    };
    loadCart();
  }, [cartId]);

  // ✅ Step 3: Save cart to Firestore when it changes (skip first load)
  useEffect(() => {
    if (!cartId || isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const saveCart = async () => {
      const ref = doc(db, "carts", cartId);
      await setDoc(ref, { items: cart });
      console.log("💾 Cart saved to Firestore:", cart);
    };
    saveCart();
  }, [cart, cartId]);

  // ✅ Step 4: Add item to cart
  const addToCart = (item) => {
    if (!cartId) {
      console.warn("🚫 Cart ID not ready");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      let updated;
      if (exists) {
        updated = prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      } else {
        updated = [...prev, { ...item, quantity: item.quantity || 1 }];
      }
      console.log("✅ Cart after add:", updated);
      return updated;
    });
  };

  // ✅ Step 5: Update item quantity
  const updateCartItem = (id, updatedItem) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  // ✅ Step 6: Remove & clear
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // ✅ Done — provide context
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
