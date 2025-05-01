// Import context and Firebase auth
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

// Import signup/login pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// Import core components
import PrayerButton from "./components/PrayerButton";
import PrayerStats from "./components/PrayerStats";
import LastPrayer from "./components/LastPrayer";
import PrayerLog from "./components/PrayerLog";
import PrayerStreak from "./components/PrayerStreak";
import PrayerMap from "./components/PrayerMap";

//Import react components
import { useState } from "react";

// Import Styles
import * as styles from "./styles";
import { useTheme } from "./ThemeContext";
import { getContainerStyles } from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuth(); // 🔐 Get the currently logged-in user
  const auth = getAuth(app); // Firebase Auth instance
  const { darkMode, toggleTheme } = useTheme(); // dark mode
  const [showLogin, setShowLogin] = useState(true);

  // 🔘 Log out the user
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div style={getContainerStyles(darkMode)}>
      <h1>🙏 Hour Father 🙏</h1>

      {/* 👤 Not logged in: show SignUp + Login forms */}
      {!user && (
  <>
    {showLogin ? (
      <>
        <Login />
        <p style={{ marginTop: "1rem" }}>
          Need an account?{" "}
          <button
            onClick={() => setShowLogin(false)}
            style={{
              border: "none",
              background: "none",
              color: "#0d6efd",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Create one here
          </button>
        </p>
      </>
    ) : (
      <>
        <SignUp />
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <button
            onClick={() => setShowLogin(true)}
            style={{
              border: "none",
              background: "none",
              color: "#0d6efd",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Log in here
          </button>
        </p>
      </>
    )}
  </>
)}

      {/* 👤 Logged in: show greeting, button, stats, logout */}
      {user && (
        <>
          <p>Welcome back, {user.email}!</p>

          {/* 🙏 Log a new prayer */}
          <PrayerButton />

          {/* 📊 Show total prayer count */}
          <PrayerStats />

          {/* 🕒 Show the most recent prayer time (or fallback if none) */}
          <LastPrayer />

          {/* 🔥 Add streak tracker */}
          <PrayerStreak />

          

          {/* 📜 Add the list below the stats */}
          <PrayerLog darkMode={darkMode} />

          <ToastContainer position="top-center" autoClose={3000} />

          {/* 🌙 Dark mode button*/}
          <button onClick={toggleTheme} style={{ marginBottom: "1rem" }}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <br />

          {/* 🔓 Log out button */}
          <button onClick={handleLogout} style={styles.button}>
            Log Out
          </button>
          <PrayerMap />
        </>
        
      )}
    </div>
  );
}

export default App;
