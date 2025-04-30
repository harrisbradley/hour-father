// src/styles.js
export function getContainerStyles(darkMode) {
  return {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#e0e0e0" : "#000000",
    minHeight: "100vh",
    transition: "background 0.3s, color 0.3s",
  };
}

export const container = {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
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
    backgroundColor: "#4CAF50",
    color: "#fff",
    marginTop: "1rem",
  };
  
  export const card = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginTop: "1rem",
  };
  

  export const prayerButton = {
    backgroundColor: "#5990e3", // Marian blue
    color: "#fff",
    fontSize: "1.25rem",
    padding: "1.25rem 2.5rem",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    marginTop: "2rem",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    boxShadow: "0 5px 10px rgba(77, 142, 240, 0.3)",
  };

  export const prayerButtonHover = {
    backgroundColor: "#0b5ed7", // Slightly darker blue
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.02)",
  };
  
