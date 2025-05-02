// src/components/UserProfile.js
import { useState } from "react";

function UserProfile({ onBack }) {
  const [name, setName] = useState("");
  const [timeZone, setTimeZone] = useState("");

  return (
    <div style={styles.container}>
      <h2>User Profile ⚙️</h2>

      {/* Name Input */}
      <label style={styles.label}>
        Display Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={styles.input}
        />
      </label>

      {/* Time Zone Input */}
      <label style={styles.label}>
        Time Zone:
        <input
          type="text"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          placeholder="e.g. America/Los_Angeles"
          style={styles.input}
        />
      </label>

      {/* Save Button */}
      <button style={styles.button}>💾 Save Changes</button>

      <hr style={{ margin: "2rem 0" }} />

      {/* Clear Prayer Log */}
      <button style={{ ...styles.button, backgroundColor: "#dc3545" }}>
        🗑️ Clear Prayer Log
      </button>

      {/* Change Password */}
      <button style={styles.button}>🔒 Change Password</button>

      {/* Back */}
      <button onClick={onBack} style={styles.backButton}>
        ⬅️ Back
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "1rem",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    marginTop: "0.25rem",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    marginTop: "1rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "2rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default UserProfile;
