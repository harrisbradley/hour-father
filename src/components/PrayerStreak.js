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

function PrayerStreak({ refreshKey }) {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0); // 🔥 Current streak
  const [record, setRecord] = useState(0); // 🏆 All-time high streak
  const [showConfetti, setShowConfetti] = useState(false); // 🎉 Toggle confetti

  useEffect(() => {
    async function calculateStreak() {
      if (!user) return;

      // 1️⃣ Fetch prayer history
      const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid),
        orderBy("prayedAt", "desc")
      );
      const snapshot = await getDocs(q);

      // 2️⃣ Extract prayer dates (normalized)
      const dateStrings = snapshot.docs
        .map((doc) => doc.data().prayedAt?.toDate())
        .filter(Boolean)
        .map((date) => date.toLocaleDateString());

      const uniqueDates = [...new Set(dateStrings)];

      // 3️⃣ Count consecutive prayer days
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
          checkDate.setDate(checkDate.getDate() - 1); // ⏪ Go back 1 day
        } else {
          break;
        }
      }

      setStreak(currentStreak);

      // 4️⃣ Fetch saved record
      const ref = doc(db, "users", user.uid);
      const profileSnap = await getDoc(ref);
      const data = profileSnap.exists() ? profileSnap.data() : {};
      const prevRecord = data.streakRecord || 0;
      setRecord(prevRecord);

      // 5️⃣ If beat record, update + celebrate 🎉
      if (currentStreak > prevRecord) {
        await setDoc(ref, { ...data, streakRecord: currentStreak });
        toast.success(`🎉 New prayer streak record: ${currentStreak} days!`);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // ⏱️ Confetti for 5 sec
      }
    }

    calculateStreak();
  }, [user, refreshKey]);

  return (
    <>
      {showConfetti && <Confetti />}
      <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
        {streak > 0 ? (
          <span>🔥 You’re on a {streak}-day prayer streak!</span>
        ) : (
          <span>No active prayer streak.</span>
        )}
      </p>
    </>
  );
}

export default PrayerStreak;
