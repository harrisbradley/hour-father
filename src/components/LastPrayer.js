// src/components/LastPrayer.js
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { colors, fonts } from "../styles/ui";

function LastPrayer({ refreshKey, darkMode }) {
  const { user } = useAuth();
  const [lastTime, setLastTime] = useState(null);

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
          const date = docData.prayedAt?.toDate();
          setLastTime(date);
        } else {
          setLastTime(null);
        }
      } catch (err) {
        console.warn("Error fetching last prayer:", err);
      }
    }

    fetchLastPrayer();
  }, [user, refreshKey]);

  function formatDate(date) {
    if (!date) return "None logged";
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>🕒</div>
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
        Last Prayer Timestamp
      </div>
      <div
        style={{
          fontSize: "1.25rem",
          fontFamily: fonts.numeric,
          fontWeight: 700,
          color: darkMode ? colors.darkText : colors.lightText,
          marginTop: "0.4rem",
        }}
      >
        {formatDate(lastTime)}
      </div>
    </div>
  );
}

export default LastPrayer;
