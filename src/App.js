// ⚛️ Core React
import { useState } from "react";

// 🔐 Firebase & Auth
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";
import { useAuth } from "./AuthContext";

// 🎨 Theming & Styles
import { useTheme } from "./ThemeContext";
import { getContainerStyles } from "./styles/styles";

// 🔔 Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🪝 Custom Hooks
import { useUserProfile } from "./hooks/useUserProfile";

// 🧾 Top-level Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// 🧩 App Components
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import UserProfile from "./components/UserProfile";
import OurFatherModal from "./components/OurFatherModal";


function App() {
  const { user } = useAuth();
  const auth = getAuth(app);
  const { darkMode } = useTheme();

  const { userProfile } = useUserProfile(user);
  const [showLogin, setShowLogin] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  // 🚪 Handle logout
  async function handleLogout() {
    await signOut(auth);
  }

  // 🕒 Fallback while loading profile
  if (user && !userProfile) {
    return <div style={{ padding: "2rem" }}>Loading profile...</div>;
  }

  return (
    <>
      <div style={getContainerStyles(darkMode)}>
        <Header
          onToggleProfile={() => setShowProfile(true)}
          userName={userProfile?.name}
        />

        {/* 🔐 Login / Signup */}
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

        {/* 👤 Logged-in content */}
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

        {/* 🙏 Prayer modal */}
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
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
