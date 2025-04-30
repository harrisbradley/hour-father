// src/pages/Login.js
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useAuth } from "../AuthContext"; // ✅ get current user

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const auth = getAuth(app);
  const { user } = useAuth(); // 🔍 get current logged-in user

  // ✅ LOGIN
  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Logged in!");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  }

  // ✅ LOGOUT
  async function handleLogout() {
    await signOut(auth);
    setMessage("👋 Logged out.");
  }

  // 👤 If user is logged in, show greeting + logout
  if (user) {
    return (
      <div style={{ margin: "1rem", textAlign: "center" }}>
        <p>Welcome back, {user.email}</p>
        <button onClick={handleLogout}>Log Out</button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  // 👤 If NOT logged in, show login form
  return (
    <form onSubmit={handleLogin} style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Log In</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "1rem auto", padding: "0.5rem", width: "250px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "1rem auto", padding: "0.5rem", width: "250px" }}
      />

      <button type="submit" style={{ padding: "0.5rem 1rem" }}>Log In</button>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </form>
  );
}

export default Login;
