// src/components/PrayerStreak.js
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { colors, fonts } from "../styles/ui";

function PrayerStreak({ refreshKey, darkMode }) {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function calculateStreak() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "prayers"),
          where("userId", "==", user.uid),
          orderBy("prayedAt", "desc")
        );
        const snapshot = await getDocs(q);

        const dateStrings = snapshot.docs
          .map((doc) => doc.data().prayedAt?.toDate())
          .filter(Boolean)
          .map((date) => date.toLocaleDateString());
        const uniqueDates = [...new Set(dateStrings)];

        let currentStreak = 0;
        let today = new Date();
        let checkDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );

        for (let i = 0; i < uniqueDates.length; i++) {
          const dateStr = checkDate.toLocaleDateString();
          if (uniqueDates.includes(dateStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        setStreak(currentStreak);

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const data = snap.exists() ? snap.data() : {};
        const previousRecord = data.streakRecord || 0;
        setRecord(previousRecord);

        if (currentStreak > previousRecord && currentStreak > 0) {
          await setDoc(ref, { ...data, streakRecord: currentStreak }).catch(() => {});
          toast.success(`🎉 New prayer streak record: ${currentStreak} days!`);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      } catch (err) {
        console.warn("Error calculating streak:", err);
      }
    }

    calculateStreak();
  }, [user, refreshKey]);

  return (
    <div>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>🔥</div>
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
        Prayer Streak
      </div>
      <div
        style={{
          fontSize: "2.2rem",
          fontFamily: fonts.numeric,
          fontWeight: 700,
          color: colors.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
        }}
      >
        {streak} <span style={{ fontSize: "1rem", fontWeight: 600, color: darkMode ? "#94a3b8" : "#64748b" }}>Days</span>
      </div>
      
      <div style={{ marginTop: "0.4rem", fontSize: "0.78rem", color: darkMode ? "#94a3b8" : "#64748b" }}>
        🏆 Record: <strong>{record}</strong> days
      </div>
    </div>
  );
}

export default PrayerStreak;
