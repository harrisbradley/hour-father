import { colors } from "./ui";

export function getContainerStyles(darkMode) {
  return {
    maxWidth: "840px",
    margin: "0 auto",
    padding: "0 1rem 3rem 1rem",
    textAlign: "center",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    backgroundColor: darkMode ? colors.darkBg : colors.lightBg,
    color: darkMode ? colors.darkText : colors.lightText,
    minHeight: "100vh",
    transition: "background 0.3s, color 0.3s",
  };
}

export const container = {
  maxWidth: "840px",
  margin: "0 auto",
  padding: "1rem",
  textAlign: "center",
  fontFamily: "'Segoe UI', Roboto, sans-serif",
};

export const heading = {
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

export const button = {
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
  backgroundColor: colors.primary,
  color: "#ffffff",
  fontSize: "1.3rem",
  padding: "1.2rem 2.8rem",
  border: `2px solid ${colors.accent}`,
  borderRadius: "16px",
  cursor: "pointer",
  marginTop: "1.5rem",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  boxShadow: "0 6px 20px rgba(0, 68, 167, 0.35)",
  transition: "all 0.2s ease-in-out",
};

export const prayerButtonHover = {
  backgroundColor: colors.primaryHover,
  boxShadow: "0 8px 24px rgba(245, 197, 24, 0.4)",
  transform: "scale(1.03)",
};
  

  export const toggleContainer = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginRight: "1rem",
  };
  
  export const toggleSwitch = {
    position: "relative",
    width: "50px",
    height: "24px",
  };
  
  export const toggleCheckbox = {
    opacity: 0,
    width: 0,
    height: 0,
  };
  
  export const toggleSlider = {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ccc",
    borderRadius: "24px",
    transition: "0.4s",
  };
  
  export const toggleSliderBefore = {
    content: '""',
    position: "absolute",
    height: "18px",
    width: "18px",
    left: "3px",
    bottom: "3px",
    backgroundColor: "white",
    borderRadius: "50%",
    transition: "0.4s",
  };
  
