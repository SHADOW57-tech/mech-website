// src/firebase.js
// src/firebase.js

// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Client's Firebase config (fixed storageBucket)
const firebaseConfig = {
  apiKey: "AIzaSyB0Di8eY_rJdJuOD2XdxYLUw3PVG19NZtE",
  authDomain: "mechanic-website-b21f5.firebaseapp.com",
  projectId: "mechanic-website-b21f5",
  storageBucket: "mechanic-website-b21f5.appspot.com", // 👈 FIXED HERE
  messagingSenderId: "107908327200",
  appId: "1:107908327200:web:c780497b1e1d5892861945",
  measurementId: "G-MWTRJJV57V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Helpers (optional)
export { serverTimestamp };

