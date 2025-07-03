import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const location = useLocation(); // track where user tried to access

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        🔐 Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
