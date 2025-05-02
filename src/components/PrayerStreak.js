// src/components/PrayerStreak.js
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function PrayerStreak({refreshKey}) {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function calculateStreak() {
      if (!user) return;

      const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid),
        orderBy("prayedAt", "desc")
      );

      const snapshot = await getDocs(q);

      // Extract and normalize dates (YYYY-MM-DD)
      const dateStrings = snapshot.docs
        .map((doc) => doc.data().prayedAt?.toDate())
        .filter(Boolean)
        .map((date) => date.toLocaleDateString()); // "YYYY-MM-DD"

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
          checkDate.setDate(checkDate.getDate() - 1); // Go back 1 day
        } else {
          break;
        }
      }

      setStreak(currentStreak);
    }

    calculateStreak();
  }, [user, refreshKey]);

  return (
    <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
      {streak > 0 ? (
        <span>🔥 You’re on a {streak}-day prayer streak!</span>
      ) : (
        <span>No active prayer streak.</span>
      )}
    </p>
  );
}

export default PrayerStreak;
