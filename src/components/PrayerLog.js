// src/components/PrayerLog.js
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { colors, fonts } from "../styles/ui";

function PrayerLog({ darkMode, refreshKey }) {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    async function fetchPrayers() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "prayers"),
          where("userId", "==", user.uid),
          orderBy("prayedAt", "desc"),
          limit(5)
        );

        const snapshot = await getDocs(q);

        const results = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            prayedAt: data.prayedAt?.toDate(),
            hasLocation: !!(data.location?.lat && data.location?.lng),
          };
        });

        setPrayers(results);
      } catch (err) {
        console.warn("Error fetching prayer log:", err);
      }
    }

    fetchPrayers();
  }, [user, refreshKey]);

  return (
    <div
      style={{
        marginTop: "2.5rem",
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
        <span>📜</span> Recent Prayer History
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {prayers.map((prayer) => (
          <li
            key={prayer.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: darkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid #f1f5f9",
              padding: "0.75rem 0",
              fontSize: "0.95rem",
              fontFamily: fonts.body,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ color: darkMode ? colors.accent : colors.primary }}>
                🙏
              </span>
              <span>
                {prayer.prayedAt
                  ? prayer.prayedAt.toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Pending..."}
              </span>
            </div>

            {prayer.hasLocation && (
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.6rem",
                  backgroundColor: "rgba(245, 197, 24, 0.15)",
                  color: colors.accent,
                  borderRadius: "10px",
                  fontWeight: 600,
                }}
              >
                📍 Location Saved
              </span>
            )}
          </li>
        ))}

        {prayers.length === 0 && (
          <li
            style={{
              fontStyle: "italic",
              color: darkMode ? "#94a3b8" : "#64748b",
              textAlign: "center",
              padding: "1rem 0",
            }}
          >
            No prayers logged yet. Begin your journey today!
          </li>
        )}
      </ul>
    </div>
  );
}

export default PrayerLog;
