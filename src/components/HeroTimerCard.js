// src/components/HeroTimerCard.js
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { useElapsedTimer } from "../hooks/useElapsedTimer";
import PrayerButton from "./PrayerButton";
import { colors, fonts } from "../styles/ui";

function HeroTimerCard({ refreshKey, darkMode, onShowPrayerModal }) {
  const { user } = useAuth();
  const [lastPrayerDate, setLastPrayerDate] = useState(null);

  useEffect(() => {
    async function fetchLastPrayer() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "prayers"),
          where("userId", "==", user.uid),
          orderBy("prayedAt", "desc"),
          limit(1)
        );

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setLastPrayerDate(docData.prayedAt?.toDate() || null);
        } else {
          setLastPrayerDate(null);
        }
      } catch (err) {
        console.warn("Error fetching last prayer date for timer:", err);
      }
    }

    fetchLastPrayer();
  }, [user, refreshKey]);

  const { elapsedFormatted, status } = useElapsedTimer(lastPrayerDate);

  // Status badge config
  const statusBadge = {
    fresh: { label: "✨ Freshly Connected", bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e" },
    due: { label: "⏰ Hourly Prayer Due", bg: "rgba(245, 197, 24, 0.18)", color: "#f5c518" },
    overdue: { label: "🕯️ Time for Prayer", bg: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" },
  }[status] || { label: "🕯️ Time for Prayer", bg: "rgba(245, 197, 24, 0.18)", color: "#f5c518" };

  return (
    <div
      style={{
        padding: "2rem 1.5rem",
        backgroundColor: darkMode ? colors.darkCardBg : colors.lightCardBg,
        border: darkMode
          ? `1px solid ${colors.subtleGoldBorder}`
          : "1px solid #e2e8f0",
        borderRadius: "20px",
        boxShadow: darkMode
          ? "0 12px 32px rgba(0,0,0,0.5)"
          : "0 6px 20px rgba(0,0,0,0.06)",
        textAlign: "center",
        marginBottom: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "100px",
          background: colors.goldGlow,
          filter: "blur(50px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Status Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.35rem 0.9rem",
          backgroundColor: statusBadge.bg,
          color: statusBadge.color,
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontFamily: fonts.body,
          fontWeight: 600,
          marginBottom: "1rem",
          border: `1px solid ${statusBadge.color}44`,
        }}
      >
        {statusBadge.label}
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <span
          style={{
            fontSize: "0.88rem",
            color: darkMode ? "#94a3b8" : "#64748b",
            fontFamily: fonts.body,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
          }}
        >
          Time Since Last Prayer
        </span>
      </div>

      {/* Ticking Live Timer */}
      <div
        style={{
          fontSize: "2.4rem",
          fontFamily: fonts.numeric,
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: darkMode ? colors.darkText : colors.lightText,
          textShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.5)" : "none",
          marginBottom: "1.5rem",
        }}
      >
        {elapsedFormatted}
      </div>

      {/* Primary Action Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <PrayerButton onPrayed={() => {}} />

        <button
          onClick={onShowPrayerModal}
          style={{
            background: "none",
            border: "none",
            color: darkMode ? colors.accent : colors.primary,
            fontFamily: fonts.sacred,
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "opacity 0.2s ease",
          }}
        >
          📖 Recite Our Father Prayer
        </button>
      </div>
    </div>
  );
}

export default HeroTimerCard;
