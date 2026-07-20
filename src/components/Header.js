// src/components/Header.js
import { useTheme } from "../ThemeContext";
import { colors, buttons } from "../styles/ui";

function Header({ onToggleProfile, userName }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 1.5rem",
        backgroundColor: darkMode ? colors.darkCardBg : "#ffffff",
        color: darkMode ? colors.darkText : colors.lightText,
        borderBottom: darkMode
          ? `1px solid ${colors.subtleGoldBorder}`
          : "1px solid #e2e8f0",
        borderRadius: "0 0 12px 12px",
        boxShadow: darkMode
          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
          : "0 2px 8px rgba(0, 0, 0, 0.05)",
        marginBottom: "1.5rem",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: darkMode ? colors.accent : colors.primary,
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span>🙏</span> Hour Father
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* 🌙 Custom toggle switch */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>{darkMode ? "🌙" : "☀️"}</span>
          <div
            onClick={toggleTheme}
            style={{
              width: "48px",
              height: "26px",
              backgroundColor: darkMode ? colors.primary : "#cbd5e1",
              borderRadius: "13px",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                position: "absolute",
                top: "3px",
                left: darkMode ? "25px" : "3px",
                transition: "left 0.3s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </label>

        {/* ⚙️ Profile Button */}
        <button
          onClick={onToggleProfile}
          style={{
            ...buttons.base,
            ...(darkMode ? buttons.accent : buttons.primary),
            padding: "0.45rem 1rem",
            fontSize: "0.88rem",
          }}
        >
          ⚙️ {userName || "Profile"}
        </button>
      </div>
    </header>
  );
}

export default Header;
