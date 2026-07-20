// src/components/PrayerStats.js
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { colors, fonts } from "../styles/ui";

function PrayerStats({ refreshKey, darkMode }) {
  const { user } = useAuth();
  const [prayerCount, setPrayerCount] = useState(0);

  useEffect(() => {
    async function fetchPrayerCount() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "prayers"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        setPrayerCount(snapshot.size);
      } catch (err) {
        console.warn("Error fetching prayer stats:", err);
      }
    }

    fetchPrayerCount();
  }, [user, refreshKey]);

  return (
    <div>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>📿</div>
      <div
        style={{
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: darkMode ? "#94a3b8" : "#64748b",
          fontWeight: 600,
          marginBottom: "0.4rem",
        }}
      >
        Total Prayers
      </div>
      <div
        style={{
          fontSize: "2.2rem",
          fontFamily: fonts.numeric,
          fontWeight: 700,
          color: darkMode ? colors.accent : colors.primary,
        }}
      >
        {prayerCount}
      </div>
    </div>
  );
}

export default PrayerStats;
