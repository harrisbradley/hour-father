// 📁 StatsSection.js – Combines all prayer stat components into one section

// 📦 Import styles for layout
import "../styles/StatsSection.css";

// 📊 Import individual stat components
import PrayerStats from "./PrayerStats";
import LastPrayer from "./LastPrayer";
import PrayerStreak from "./PrayerStreak";

// 🚀 Functional component to group all stat displays
function StatsSection({ refreshKey }) {
  return (
    // 📐 Responsive container (styled via CSS)
    <section className="stats-section">
      {/* 🔢 Total prayer count display */}
      <PrayerStats refreshKey={refreshKey} />

      {/* ⏰ Last prayer time display */}
      <LastPrayer refreshKey={refreshKey} />

      {/* 🔥 Current prayer streak display */}
      <PrayerStreak refreshKey={refreshKey} />
    </section>
  );
}

// 📤 Export component for use in MainContent or other parents
export default StatsSection;
