// src/styles/ui.js

// 🎨 Marian Blue & Sacred Gold Palette Tokens
export const colors = {
  primary: "#003884",         // Deep Marian Blue
  primaryHover: "#002866",
  accent: "#f5c518",          // Sacred Gold
  accentHover: "#d4af37",
  goldGlow: "rgba(245, 197, 24, 0.35)",
  danger: "#ef4444",
  dangerHover: "#dc2626",
  neutral: "#64748b",
  lightBg: "#f8fafc",
  darkBg: "#090d16",          // Deep Sanctuary Midnight
  darkCardBg: "#131b2e",
  lightCardBg: "#ffffff",
  lightText: "#0f172a",
  darkText: "#f8fafc",
  subtleGoldBorder: "rgba(245, 197, 24, 0.22)",
  goldGradient: "linear-gradient(135deg, #f5c518 0%, #d4af37 100%)",
  marianGradient: "linear-gradient(135deg, #003884 0%, #0a4f9e 100%)",
};

// 📐 Layout & Container
export const layout = {
  container: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "0",
  },
  section: {
    marginBottom: "2rem",
  },
};

// 🖋️ Typography Systems (Cinzel, Outfit, Inter)
export const fonts = {
  sacred: "'Cinzel', serif",
  numeric: "'Outfit', sans-serif",
  body: "'Inter', sans-serif",
};

export const typography = {
  sacredHeading: {
    fontFamily: fonts.sacred,
    fontWeight: "700",
    letterSpacing: "-0.01em",
  },
  numericTimer: {
    fontFamily: fonts.numeric,
    fontWeight: "700",
    letterSpacing: "0.05em",
  },
  body: {
    fontFamily: fonts.body,
    fontSize: "1rem",
    lineHeight: "1.6",
  },
};

// 🔘 Reusable Button Variants
export const buttons = {
  base: {
    fontFamily: fonts.body,
    padding: "0.7rem 1.5rem",
    fontSize: "0.95rem",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  hero: {
    fontFamily: fonts.sacred,
    background: colors.marianGradient,
    color: "#ffffff",
    border: `2px solid ${colors.accent}`,
    borderRadius: "16px",
    padding: "1.2rem 2.8rem",
    fontSize: "1.25rem",
    fontWeight: "700",
    letterSpacing: "0.03em",
    boxShadow: `0 8px 24px ${colors.goldGlow}`,
    cursor: "pointer",
  },
  primary: {
    background: colors.marianGradient,
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 56, 132, 0.3)",
  },
  accent: {
    background: colors.goldGradient,
    color: "#090d16",
    fontWeight: "700",
    boxShadow: `0 4px 14px ${colors.goldGlow}`,
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
    border: `2px solid ${colors.accent}`,
    color: colors.accent,
  },
};

// 🃏 Glassmorphic Card Components
export const cards = {
  base: {
    borderRadius: "16px",
    padding: "1.5rem",
    transition: "all 0.25s ease-in-out",
  },
  light: {
    backgroundColor: colors.lightCardBg,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
  },
  dark: {
    backgroundColor: colors.darkCardBg,
    border: `1px solid ${colors.subtleGoldBorder}`,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
  },
};
