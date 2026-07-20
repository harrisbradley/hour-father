// src/styles/ui.js

// 🎨 Marian Blue & Gold Theme Tokens
export const colors = {
  primary: "#0044a7",      // Marian Blue
  primaryHover: "#003482",
  accent: "#f5c518",       // Sacred Gold
  accentHover: "#d8ab0c",
  danger: "#dc3545",
  dangerHover: "#bd2130",
  neutral: "#6c757d",
  lightBg: "#f8fafc",
  darkBg: "#0f172a",       // Deep Sacred Midnight
  darkCardBg: "#1e293b",
  lightCardBg: "#ffffff",
  lightText: "#0f172a",
  darkText: "#f8fafc",
  subtleGoldBorder: "rgba(245, 197, 24, 0.25)",
};

// 📐 Layout & Spacing
export const layout = {
  container: {
    maxWidth: "840px",
    margin: "0 auto",
    padding: "0",
  },
  section: {
    marginBottom: "2rem",
  },
};

// 🖋️ Typography
export const typography = {
  heading: {
    fontFamily: "'Segoe UI', Roboto, sans-serif",
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
    padding: "0.65rem 1.4rem",
    fontSize: "0.95rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  primary: {
    backgroundColor: colors.primary,
    color: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 68, 167, 0.25)",
  },
  accent: {
    backgroundColor: colors.accent,
    color: "#0f172a",
    boxShadow: "0 4px 10px rgba(245, 197, 24, 0.3)",
  },
  secondary: {
    backgroundColor: colors.neutral,
    color: "#ffffff",
  },
  danger: {
    backgroundColor: colors.danger,
    color: "#ffffff",
  },
  outline: {
    backgroundColor: "transparent",
    border: `2px solid ${colors.primary}`,
    color: colors.primary,
  },
};

// 🃏 Card Component Tokens
export const cards = {
  base: {
    borderRadius: "12px",
    padding: "1.25rem",
    transition: "all 0.2s ease",
  },
  light: {
    backgroundColor: colors.lightCardBg,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  dark: {
    backgroundColor: colors.darkCardBg,
    border: `1px solid ${colors.subtleGoldBorder}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
};
