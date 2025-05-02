// 📦 Firebase & Authentication setup
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

// 🧾 Page-level components
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// 🧩 Core UI components
import PrayerButton from "./components/PrayerButton";
import PrayerStats from "./components/PrayerStats";
import LastPrayer from "./components/LastPrayer";
import PrayerLog from "./components/PrayerLog";
import PrayerStreak from "./components/PrayerStreak";
import PrayerMap from "./components/PrayerMap";
import UserProfile from "./components/UserProfile";
import OurFather from "./components/OurFather";

// ⚛️ React tools
import { useState, useEffect } from "react";

// 🎨 Styling & Themes
import * as styles from "./styles";
import { useTheme } from "./ThemeContext";
import { getContainerStyles } from "./styles";

// 🔔 Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // 🔐 Auth + Theme
  const { user } = useAuth();
  const auth = getAuth(app);
  const { darkMode, toggleTheme } = useTheme();

  // 🧠 App-level state
  const [showLogin, setShowLogin] = useState(true); // toggle between login/signup
  const [refreshKey, setRefreshKey] = useState(0); // for reloading prayer data
  const [showProfile, setShowProfile] = useState(false); // profile screen toggle
  const [userProfile, setUserProfile] = useState(null); // { name, timeZone }
  const [showPrayerText, setShowPrayerText] = useState(false);

  // 🔄 Load user profile from Firestore
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserProfile(snap.data());
      }
    }

    fetchProfile();
  }, [user]);

  // 🚪 Log out the user
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <>
      {/* 🎨 Themed app container */}
      <div style={getContainerStyles(darkMode)}>
        <h1>🙏 Hour Father 🙏</h1>

        {/* 👥 If no user is logged in... show Login/Signup */}
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

        {/* 👤 If user is logged in... */}
        {user &&
          (showProfile ? (
            // ⚙️ Profile view
            <UserProfile onBack={() => setShowProfile(false)} />
          ) : (
            <>
              {/* 🙋‍♂️ Greet user by name or email */}
              <p>
                Welcome back, <strong>{userProfile?.name || user.email}</strong>
              </p>

              {/* 🙏 Core functionality */}
              <PrayerButton onPrayed={() => setRefreshKey((k) => k + 1)} />
              <button
  onClick={() => setShowPrayerText(!showPrayerText)}
  style={{
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  {showPrayerText ? "Hide Our Father" : "Show Our Father"}
</button>
{showPrayerText && <OurFather />}
              <PrayerStats refreshKey={refreshKey} />
              <LastPrayer refreshKey={refreshKey} />
              <PrayerStreak refreshKey={refreshKey} />
              <PrayerLog refreshKey={refreshKey} darkMode={darkMode} />
              <PrayerMap
                refreshKey={refreshKey}
                userTimeZone={userProfile?.timeZone}
              />

              {/* ⚙️ Settings & Appearance */}
              <button
                onClick={() => setShowProfile(true)}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#198754",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ⚙️ Profile Settings
              </button>

              {/* 🌙 Theme Toggle */}
              <button onClick={toggleTheme} style={{ marginTop: "1rem" }}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {/* 🔓 Logout */}
              <button onClick={handleLogout} style={styles.button}>
                Log Out
              </button>
            </>
          ))}
      </div>

      {/* 💬 Toast notifications (non-blocking) */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
