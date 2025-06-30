import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhs-KyRA--iUbkaMlH3SQtjgD23oV1GxM",
  authDomain: "mechanic-project-b0250.firebaseapp.com",
  projectId: "mechanic-project-b0250",
  storageBucket: "mechanic-project-b0250.firebasestorage.app",
  messagingSenderId: "587076518608",
  appId: "1:587076518608:web:f18071c7bbcc6903a194d5",
  measurementId: "G-G55RHBP000"
};




// Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export { serverTimestamp };
export const auth = getAuth(app);
export const storage = getStorage(app);
// export default app;