// pages/Login.jsx
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful 🎉");
      navigate("/");
    } catch (err) {
      alert("Login failed ❌ " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleLogin} className="bg-red-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </div>
  );
}
