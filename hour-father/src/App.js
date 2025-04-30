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
import LastPrayer from "./components/LastPrayer"; // ✅ new
import PrayerLog from "./components/PrayerLog"; // ✅ new

function App() {
  const { user } = useAuth(); // 🔐 Get the currently logged-in user
  const auth = getAuth(app);  // Firebase Auth instance

  // 🔘 Log out the user
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Hour Father 🙏</h1>

      {/* 👤 Not logged in: show SignUp + Login forms */}
      {!user && (
        <>
          <SignUp />
          <Login />
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

          {/* 📜 Add the list below the stats */}
          <PrayerLog /> 

          {/* 🔓 Log out button */}
          <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}

export default App;
