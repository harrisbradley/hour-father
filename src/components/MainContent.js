// src/components/MainContent.js
import HeroTimerCard from "./HeroTimerCard";
import StatsSection from "./StatsSection";
import WeeklyChart from "./WeeklyChart";
import PrayerLog from "./PrayerLog";
import PrayerMap from "./PrayerMap";
import { colors, fonts } from "../styles/ui";

function MainContent({
  user,
  userProfile,
  refreshKey,
  onShowProfile,
  onShowPrayerModal,
  onLogout,
  darkMode,
}) {
  return (
    <div style={{ padding: "0.5rem 0.5rem 2rem 0.5rem" }}>
      {/* Welcome Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "0 0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "1.1rem",
            margin: 0,
            fontFamily: fonts.body,
            color: darkMode ? colors.darkText : colors.lightText,
          }}
        >
          Welcome back,{" "}
          <strong style={{ color: darkMode ? colors.accent : colors.primary }}>
            {userProfile?.name || user.email?.split("@")[0] || "Friend"}
          </strong>
        </p>
      </div>

      {/* 1. Hero Timer & Action Card */}
      <HeroTimerCard
        refreshKey={refreshKey}
        darkMode={darkMode}
        onShowPrayerModal={onShowPrayerModal}
      />

      {/* 2. Responsive 3-Column Stats Grid */}
      <StatsSection refreshKey={refreshKey} darkMode={darkMode} />

      {/* 3. Weekly Prayer Activity Bar Chart */}
      <WeeklyChart refreshKey={refreshKey} darkMode={darkMode} />

      {/* 4. Recent Prayer Log */}
      <PrayerLog refreshKey={refreshKey} darkMode={darkMode} />

      {/* 5. Interactive Spiritual Prayer Map */}
      <PrayerMap
        refreshKey={refreshKey}
        userTimeZone={userProfile?.timeZone || "default"}
        darkMode={darkMode}
      />

      {/* 6. Logout Footer */}
      <div style={{ marginTop: "3rem", paddingBottom: "1.5rem", textAlign: "center" }}>
        <button
          onClick={onLogout}
          style={{
            background: "none",
            border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
            color: darkMode ? "#94a3b8" : "#64748b",
            padding: "0.5rem 1.4rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            cursor: "pointer",
            fontFamily: fonts.body,
            transition: "all 0.2s ease",
          }}
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  );
}

export default MainContent;
