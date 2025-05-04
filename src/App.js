// 📦 Firebase & Authentication setup
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
import OurFatherModal from "./components/OurFatherModal";

// ⚛️ React tools
import { useState, useEffect } from "react";

// 🎨 Styling & Themes
import * as styles from "./styles/styles";
import { useTheme } from "./ThemeContext";
import { getContainerStyles } from "./styles/styles";

// 🔔 Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // 🔐 Auth + Theme
  const { user } = useAuth();
  const auth = getAuth(app);
  const { darkMode, toggleTheme } = useTheme();

  // 🧠 App-level state
  const [showLogin, setShowLogin] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  // 🔄 Load user profile from Firestore
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        // If recordStreak is missing, set it to 0
        if (!("recordStreak" in data)) {
          await setDoc(
            ref,
            { recordStreak: 0 },
            { merge: true } // ✅ Merge with existing data
          );
          data.recordStreak = 0;
        }

        setUserProfile(data);
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
      <div style={getContainerStyles(darkMode)}>
        <h1>🙏 Hour Father 🙏</h1>

        {/* 🔧 Top-right: Theme switch + Profile button */}
        {user && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* 🌙 Dark mode switch */}
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>{darkMode ? "🌙" : "☀️"}</span>
              <div
                style={{ position: "relative", width: "50px", height: "24px" }}
              >
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleTheme}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: darkMode ? "#2196F3" : "#ccc",
                    borderRadius: "24px",
                    transition: "0.4s",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      height: "18px",
                      width: "18px",
                      left: "3px",
                      bottom: "3px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                      transform: darkMode
                        ? "translateX(26px)"
                        : "translateX(0)",
                    }}
                  />
                </span>
              </div>
            </label>

            {/* ⚙️ Profile button */}
            <button
              onClick={() => setShowProfile(true)}
              style={{
                backgroundColor: "#198754",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ⚙️
            </button>
          </div>
        )}

        {/* 👥 Login / Signup */}
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

        {/* 👤 Logged-in view */}
        {user &&
          (showProfile ? (
            <UserProfile onBack={() => setShowProfile(false)} />
          ) : (
            <>
              <p>
                Welcome back, <strong>{userProfile?.name || user.email}</strong>
              </p>

              <PrayerButton onPrayed={() => setRefreshKey((k) => k + 1)} />
              <br />
              <button
                onClick={() => setShowPrayerModal(true)}
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
                📖 Show Our Father
              </button>
              <PrayerStats refreshKey={refreshKey} />
              <LastPrayer refreshKey={refreshKey} />
              <PrayerStreak refreshKey={refreshKey} />
              <PrayerLog refreshKey={refreshKey} darkMode={darkMode} />
              {userProfile?.timeZone && (
                <PrayerMap
                  refreshKey={refreshKey}
                  userTimeZone={userProfile.timeZone}
                />
              )}

              <button onClick={handleLogout} style={styles.button}>
                Log Out
              </button>
            </>
          ))}

        {/* 🙏 Modal: Our Father */}
        {showPrayerModal && (
          <OurFatherModal
            onClose={() => setShowPrayerModal(false)}
            onPrayed={() => {
              setRefreshKey((k) => k + 1);
              setShowPrayerModal(false);
            }}
          />
        )}
      </div>

      {/* 💬 Toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
