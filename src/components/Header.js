// src/components/Header.js
import { useTheme } from "../ThemeContext";
import { colors, buttons, fonts } from "../styles/ui";

function Header({ onToggleProfile, userName }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 1.8rem",
        backgroundColor: darkMode ? colors.darkCardBg : "#ffffff",
        color: darkMode ? colors.darkText : colors.lightText,
        borderBottom: darkMode
          ? `1px solid ${colors.subtleGoldBorder}`
          : "1px solid #e2e8f0",
        borderRadius: "0 0 16px 16px",
        boxShadow: darkMode
          ? "0 8px 24px rgba(0, 0, 0, 0.4)"
          : "0 2px 12px rgba(0, 0, 0, 0.05)",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ fontSize: "1.6rem", filter: "drop-shadow(0 2px 4px rgba(245,197,24,0.4))" }}>
          🙏
        </span>
        <h1
          style={{
            margin: 0,
            fontFamily: fonts.sacred,
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
            background: darkMode ? colors.goldGradient : colors.marianGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hour Father
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
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
              width: "50px",
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
                left: darkMode ? "27px" : "3px",
                transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
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
            padding: "0.45rem 1.1rem",
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
