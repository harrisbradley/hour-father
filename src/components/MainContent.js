// src/components/MainContent.js
import PrayerButton from "./PrayerButton";
import PrayerStats from "./PrayerStats";
import LastPrayer from "./LastPrayer";
import PrayerStreak from "./PrayerStreak";
import PrayerLog from "./PrayerLog";
import PrayerMap from "./PrayerMap";
import StatsSection from "./StatsSection";


function MainContent({
  user,
  userProfile,
  refreshKey,
  setRefreshKey, // ✅ added this
  onShowProfile,
  onShowPrayerModal,
  onLogout,
  darkMode,
}) {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <p>
        Welcome back, <strong>{userProfile?.name || user.email}</strong>
      </p>

      {/* 🙏 Primary Action Button */}
      <PrayerButton onPrayed={() => setRefreshKey((k) => k + 1)} />

      {/* 📖 Open modal with full prayer */}
      <button
        onClick={onShowPrayerModal}
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

      <StatsSection refreshKey={refreshKey} />
      <PrayerLog refreshKey={refreshKey} darkMode={darkMode} />

      {/* 🗺️ Map only if user profile has a time zone */}
      {userProfile?.timeZone && (
        <PrayerMap
          refreshKey={refreshKey}
          userTimeZone={userProfile.timeZone}
        />
      )}

      {/* 🔓 Log out */}
      <button onClick={onLogout} style={{ marginTop: "2rem" }}>
        Log Out
      </button>
    </div>
  );
}

export default MainContent;
