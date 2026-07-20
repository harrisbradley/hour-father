// src/components/StatsSection.js
import "../styles/StatsSection.css";
import PrayerStats from "./PrayerStats";
import LastPrayer from "./LastPrayer";
import PrayerStreak from "./PrayerStreak";

function StatsSection({ refreshKey, darkMode }) {
  const cardClass = `stats-card ${darkMode ? "stats-card-dark" : "stats-card-light"}`;

  return (
    <section className="stats-section">
      <div className={cardClass}>
        <PrayerStats refreshKey={refreshKey} darkMode={darkMode} />
      </div>

      <div className={cardClass}>
        <LastPrayer refreshKey={refreshKey} darkMode={darkMode} />
      </div>

      <div className={cardClass}>
        <PrayerStreak refreshKey={refreshKey} darkMode={darkMode} />
      </div>
    </section>
  );
}

export default StatsSection;
