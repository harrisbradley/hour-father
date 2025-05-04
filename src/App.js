// 📦 Firebase & Authentication setup
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// 🧾 Page-level components
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// 🧩 Core UI components
import UserProfile from "./components/UserProfile";
import OurFatherModal from "./components/OurFatherModal";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

// ⚛️ React tools
import { useState, useEffect } from "react";

// 🎨 Styling & Themes
import { useTheme } from "./ThemeContext";
import { getContainerStyles } from "./styles/styles";

// 🔔 Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuth();
  const auth = getAuth(app);
  const { darkMode } = useTheme();

  const [showLogin, setShowLogin] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  // 🔄 Fetch user profile on login
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        // Ensure recordStreak is present
        if (!("recordStreak" in data)) {
          await setDoc(ref, { recordStreak: 0 }, { merge: true });
          data.recordStreak = 0;
        }

        setUserProfile(data);
      }
    }

    fetchProfile();
  }, [user]);

  // 🚪 Handle logout
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <>
      <div style={getContainerStyles(darkMode)}>
        {/* 🧭 Header with toggle + profile button */}
        <Header
          onToggleProfile={() => setShowProfile(true)}
          userName={userProfile?.name}
        />

        {/* 🔐 Auth Flow (Login/Signup) */}
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

        {/* 👤 Logged-in View */}
        {user &&
          (showProfile ? (
            <UserProfile onBack={() => setShowProfile(false)} />
          ) : (
            <>
              <p>
                Welcome back, <strong>{userProfile?.name || user.email}</strong>
              </p>

              <MainContent
                user={user}
                userProfile={userProfile}
                refreshKey={refreshKey}
                onShowProfile={() => setShowProfile(true)}
                onShowPrayerModal={() => setShowPrayerModal(true)}
                onLogout={handleLogout}
                darkMode={darkMode}
              />
            </>
          ))}

        {/* 🙏 Our Father Prayer Modal */}
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
