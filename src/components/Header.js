// src/components/Header.js
import { useTheme } from "../ThemeContext";

function Header({ onToggleProfile, userName }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: darkMode ? "#1e1e1e" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        borderBottom: darkMode ? "1px solid #444" : "1px solid #ccc",
      }}
    >
      <h1 style={{ margin: 0 }}>🙏 Hour Father</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* 🌙 Custom toggle switch */}
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>{darkMode ? "🌙" : "☀️"}</span>
          <div
            onClick={toggleTheme}
            style={{
              width: "50px",
              height: "28px",
              backgroundColor: darkMode ? "#0d6efd" : "#ccc",
              borderRadius: "14px",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                position: "absolute",
                top: "3px",
                left: darkMode ? "25px" : "3px",
                transition: "left 0.3s ease",
              }}
            />
          </div>
        </label>

        {/* ⚙️ Profile Button */}
        <button
          onClick={onToggleProfile}
          style={{
            backgroundColor: "#198754",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⚙️ {userName || "Profile"}
        </button>
      </div>
    </header>
  );
}

export default Header;
