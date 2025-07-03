import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("🎉 Signup successful!");
      navigate("/"); // redirect to homepage
    } catch (err) {
      toast.error("Signup failed ❌ " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Create an Account</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="border p-2 w-full mb-2"
      />
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
      <button onClick={handleSignup} className="bg-red-600 text-white px-4 py-2 w-full">
        Sign Up
      </button>

      <p
        onClick={() => navigate("/login")}
        className="text-sm text-blue-500 mt-4 cursor-pointer hover:underline text-center"
      >
        Already have an account? Log in
      </p>
    </div>
  );
}
