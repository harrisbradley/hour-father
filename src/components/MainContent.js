// src/components/MainContent.js
import PrayerButton from "./PrayerButton";
import PrayerLog from "./PrayerLog";
import PrayerMap from "./PrayerMap";
import StatsSection from "./StatsSection";
import { colors, buttons } from "../styles/ui";

function MainContent({
  user,
  userProfile,
  refreshKey,
  setRefreshKey,
  onShowProfile,
  onShowPrayerModal,
  onLogout,
  darkMode,
}) {
  return (
    <div style={{ padding: "0.5rem 1rem" }}>
      <p
        style={{
          fontSize: "1.1rem",
          marginBottom: "1.5rem",
          color: darkMode ? colors.darkText : colors.lightText,
        }}
      >
        Welcome back,{" "}
        <strong style={{ color: darkMode ? colors.accent : colors.primary }}>
          {userProfile?.name || user.email}
        </strong>
      </p>

      {/* 🙏 Primary Action Button */}
      <div style={{ marginBottom: "1.5rem" }}>
        <PrayerButton onPrayed={() => setRefreshKey((k) => k + 1)} />
      </div>

      {/* 📖 Open modal with full prayer */}
      <div>
        <button
          onClick={onShowPrayerModal}
          style={{
            ...buttons.base,
            ...(darkMode ? buttons.outline : buttons.primary),
            fontSize: "0.95rem",
            padding: "0.6rem 1.4rem",
          }}
        >
          📖 Show Our Father Prayer
        </button>
      </div>

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
      <div style={{ marginTop: "2.5rem", paddingBottom: "1.5rem" }}>
        <button
          onClick={onLogout}
          style={{
            ...buttons.base,
            ...buttons.secondary,
            fontSize: "0.85rem",
            padding: "0.5rem 1.2rem",
            opacity: 0.85,
          }}
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  );
}

export default MainContent;
