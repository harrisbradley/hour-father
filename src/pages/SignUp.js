// src/pages/SignUp.js
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // Import firebase app

function SignUp() {
  const [email, setEmail] = useState("");         // 🧠 User input
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);   // ✅ Feedback

  const auth = getAuth(app); // 🔥 Firebase auth instance

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password); // 🚀 Register user
      setMessage("✅ Account created successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  }

  return (
    <form onSubmit={handleSignUp} style={{ marginTop: "2rem", textAlign: "center" }}>
      <h2>Create Your Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "1rem auto", padding: "0.5rem", width: "250px" }}
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "1rem auto", padding: "0.5rem", width: "250px" }}
      />

      <button type="submit" style={{ padding: "0.5rem 1rem" }}>Sign Up</button>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </form>
  );
}

export default SignUp;
