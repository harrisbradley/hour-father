// src/pages/SignUp.js
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // ✅ Needed for saving name
import { app, db } from "../firebase"; // ✅ db now included

function SignUp() {
  // 🧠 User input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const auth = getAuth(app); // 🔥 Firebase auth instance

  // 📝 Handle form submission
  async function handleSignUp(e) {
    e.preventDefault();

    try {
      // ✅ Create account with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🧾 Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      // 🎉 Clear form + show success message
      setMessage("✅ Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("❌ " + error.message);
    }
  }

  return (
    <form
      onSubmit={handleSignUp}
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <h2>Create Your Account</h2>

      {/* 🧍 Name input */}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
        />
      </label>

      {/* 📧 Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          margin: "1rem auto",
          padding: "0.5rem",
          width: "250px",
        }}
        required
      />

      {/* 🔒 Password input */}
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          margin: "1rem auto",
          padding: "0.5rem",
          width: "250px",
        }}
        required
      />

      {/* 🚀 Submit */}
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        Sign Up
      </button>

      {/* 💬 Feedback */}
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </form>
  );
}

export default SignUp;
