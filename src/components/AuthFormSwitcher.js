// src/components/AuthFormSwitcher.js
function AuthFormSwitcher({ showLogin, onToggle, children }) {
    return (
      <div>
        {children}
        <p style={{ marginTop: "1rem" }}>
          {showLogin ? "Need an account?" : "Already have an account?"}{" "}
          <button
            onClick={onToggle}
            style={{
              border: "none",
              background: "none",
              color: "#0d6efd",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {showLogin ? "Create one here" : "Log in here"}
          </button>
        </p>
      </div>
    );
  }
  
  export default AuthFormSwitcher;
  