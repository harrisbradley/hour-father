// src/styles/styles.js
import { colors, fonts } from "./ui";

export function getContainerStyles(darkMode) {
  return {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "0 1rem 3rem 1rem",
    textAlign: "center",
    fontFamily: fonts.body,
    backgroundColor: darkMode ? colors.darkBg : colors.lightBg,
    color: darkMode ? colors.darkText : colors.lightText,
    minHeight: "100vh",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };
}

export const container = {
  maxWidth: "860px",
  margin: "0 auto",
  padding: "1rem",
  textAlign: "center",
  fontFamily: fonts.body,
};

export const heading = {
  fontFamily: fonts.sacred,
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

export const button = {
  fontFamily: fonts.body,
  padding: "0.75rem 1.25rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: colors.primary,
  color: "#fff",
  marginTop: "1rem",
  transition: "all 0.2s ease",
};

export const card = {
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "1rem",
  marginTop: "1rem",
};

export const prayerButton = {
  fontFamily: fonts.sacred,
  background: colors.marianGradient,
  color: "#ffffff",
  fontSize: "1.25rem",
  padding: "1.2rem 2.8rem",
  border: `2px solid ${colors.accent}`,
  borderRadius: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  letterSpacing: "0.03em",
  boxShadow: `0 8px 24px ${colors.goldGlow}`,
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
};

export const prayerButtonHover = {
  boxShadow: "0 12px 30px rgba(245, 197, 24, 0.5)",
  transform: "scale(1.03)",
};
