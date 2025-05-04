// src/App.js
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "./AuthContext";
import { app } from "./firebase";

// Components
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Layout from "./components/Layout";

// Styles & Context
import { useTheme } from "./ThemeContext";
import { useUserProfile } from "./hooks/useUserProfile";

function App() {
  const { user } = useAuth();
  const auth = getAuth(app);
  const { darkMode } = useTheme();

  const { userProfile } = useUserProfile(user);
  const [showLogin, setShowLogin] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  async function handleLogout() {
    await signOut(auth);
  }

  if (user && !userProfile) {
    return <div style={{ padding: "2rem" }}>Loading profile...</div>;
  }

  return (
    <Layout
      darkMode={darkMode}
      userName={userProfile?.name}
      onToggleProfile={() => setShowProfile(true)}
      showPrayerModal={showPrayerModal}
      onClosePrayerModal={() => setShowPrayerModal(false)}
      onPrayed={() => {
        setRefreshKey((k) => k + 1);
        setShowPrayerModal(false);
      }}
    >
      {!user ? (
        showLogin ? (
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
        )
      ) : showProfile ? (
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
      )}
    </Layout>
  );
}

export default App;
