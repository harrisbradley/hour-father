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
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function calculateStreak() {
      if (!user) return;

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

      if (currentStreak > previousRecord) {
        await setDoc(ref, { ...data, streakRecord: currentStreak });
        toast.success(`🎉 New prayer streak record: ${currentStreak} days!`);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }

    calculateStreak();
  }, [user, refreshKey]);

  return (
    <div style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
      {showConfetti && <Confetti />}

      {streak > 0 ? (
        <span>
          🔥 You’re on a {streak}-day prayer streak!
          {streak === record && record > 0 && (
            <span
              title="New all-time high!"
              style={{ marginLeft: "0.5rem", verticalAlign: "middle" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  animation: "pulse 1.5s infinite",
                  verticalAlign: "middle",
                }}
              >
                <g fill="#f5c518">
                  <path d="M16 6h32v12H16z" />
                  <path d="M12 12v6a8 8 0 0016 0v-6H12zm40 0h-16v6a8 8 0 0016 0v-6z" />
                  <path d="M24 18h16v12a8 8 0 01-16 0V18z" />
                  <path d="M26 34h12v4a6 6 0 01-12 0v-4z" />
                  <path d="M24 42h16v6H24z" />
                  <path d="M20 48h24v4H20z" />
                </g>
                <circle cx="32" cy="60" r="2" fill="#0044a7" />
                <style>
                  {`
                    @keyframes pulse {
                      0% { transform: scale(1); }
                      50% { transform: scale(1.1); }
                      100% { transform: scale(1); }
                    }
                  `}
                </style>
              </svg>
            </span>
          )}
        </span>
      ) : (
        <span>No active prayer streak.</span>
      )}
    </div>
  );
}

export default PrayerStreak;
