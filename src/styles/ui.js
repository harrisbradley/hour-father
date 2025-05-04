
// src/styles/ui.js

// 🎨 Marian Blue & Gold Theme
export const colors = {
  primary: "#0044a7", // Marian Blue
  accent: "#f5c518",  // Gold
  danger: "#dc3545",
  neutral: "#6c757d",
  lightBg: "#f9f9f9",
  darkBg: "#1e1e1e",
  lightText: "#1a1a1a",
  darkText: "#f1f1f1",
};

// 📐 Layout & Spacing
export const layout = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  section: {
    marginBottom: "2rem",
  },
};

// 🖋️ Typography
export const typography = {
  heading: {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.6",
  },
};

// 🔘 Button Variants
export const buttons = {
  base: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
  primary: {
    backgroundColor: colors.primary,
    color: "#fff",
  },
  secondary: {
    backgroundColor: colors.neutral,
    color: "#fff",
  },
  accent: {
    backgroundColor: colors.accent,
    color: "#000",
  },
  danger: {
    backgroundColor: colors.danger,
    color: "#fff",
  },
  outline: {
    backgroundColor: "transparent",
    border: `2px solid ${colors.primary}`,
    color: colors.primary,
  },
};
