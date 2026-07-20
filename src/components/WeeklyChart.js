// src/components/WeeklyChart.js
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { colors, fonts } from "../styles/ui";

function WeeklyChart({ refreshKey, darkMode }) {
  const { user } = useAuth();
  const [dailyCounts, setDailyCounts] = useState([]);

  useEffect(() => {
    async function fetchWeeklyActivity() {
      if (!user) return;

      try {
        const now = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const q = query(
          collection(db, "prayers"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        
        // Build map for the last 7 days
        const daysMap = {};
        const daysArray = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(now.getDate() - i);
          const dateKey = d.toLocaleDateString(undefined, { weekday: "short" });
          const fullKey = d.toISOString().split("T")[0];
          daysMap[fullKey] = { dayName: dateKey, count: 0 };
          daysArray.push(fullKey);
        }

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const dateObj = data.prayedAt?.toDate();
          if (dateObj && dateObj >= sevenDaysAgo) {
            const dateKey = dateObj.toISOString().split("T")[0];
            if (daysMap[dateKey]) {
              daysMap[dateKey].count += 1;
            }
          }
        });

        setDailyCounts(daysArray.map((key) => daysMap[key]));
      } catch (err) {
        console.warn("Error fetching weekly activity chart:", err);
      }
    }

    fetchWeeklyActivity();
  }, [user, refreshKey]);

  const maxCount = Math.max(...dailyCounts.map((d) => d.count), 1);

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        backgroundColor: darkMode ? colors.darkCardBg : colors.lightCardBg,
        border: darkMode
          ? `1px solid ${colors.subtleGoldBorder}`
          : "1px solid #e2e8f0",
        borderRadius: "16px",
        boxShadow: darkMode
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          margin: "0 0 1.2rem 0",
          fontFamily: fonts.sacred,
          fontSize: "1.15rem",
          color: darkMode ? colors.accent : colors.primary,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>📊</span> Weekly Prayer Activity
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: "120px",
          paddingTop: "1rem",
          gap: "0.5rem",
        }}
      >
        {dailyCounts.map((item, index) => {
          const heightPercent = Math.max(12, (item.count / maxCount) * 100);
          const hasPrayed = item.count > 0;

          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontFamily: fonts.numeric,
                  fontWeight: 600,
                  marginBottom: "4px",
                  color: hasPrayed
                    ? darkMode
                      ? colors.accent
                      : colors.primary
                    : colors.neutral,
                }}
              >
                {item.count}
              </span>
              <div
                style={{
                  width: "80%",
                  maxWidth: "28px",
                  height: `${heightPercent}%`,
                  background: hasPrayed
                    ? darkMode
                      ? colors.goldGradient
                      : colors.marianGradient
                    : darkMode
                    ? "#1e293b"
                    : "#e2e8f0",
                  borderRadius: "6px 6px 2px 2px",
                  transition: "height 0.4s ease-in-out, background 0.3s ease",
                  boxShadow: hasPrayed ? `0 2px 8px ${colors.goldGlow}` : "none",
                }}
              />
              <span
                style={{
                  marginTop: "8px",
                  fontSize: "0.75rem",
                  fontFamily: fonts.body,
                  color: darkMode ? "#94a3b8" : "#64748b",
                  fontWeight: 500,
                }}
              >
                {item.dayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyChart;
