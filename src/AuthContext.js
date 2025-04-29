// src/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase"; // Import Firebase app instance

const AuthContext = createContext();

// 🔥 Provide auth state to entire app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);    // Logged-in user object
  const [loading, setLoading] = useState(true); // Track when auth is ready

  useEffect(() => {
    const auth = getAuth(app);

    // 👂 Listen for login/logout changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // 🧹 Cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 🧠 Hook to use auth easily
export function useAuth() {
  return useContext(AuthContext);
}
