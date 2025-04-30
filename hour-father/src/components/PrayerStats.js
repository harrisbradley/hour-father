// src/components/PrayerStats.js
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function PrayerStats() {
  const { user } = useAuth();
  const [prayerCount, setPrayerCount] = useState(0);

  useEffect(() => {
    async function fetchPrayerCount() {
      if (!user) return;

      const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      setPrayerCount(snapshot.size); // 🔢 Number of docs = count
    }

    fetchPrayerCount();
  }, [user]);

  return (
    <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
      You’ve prayed <strong>{prayerCount}</strong> time{prayerCount === 1 ? "" : "s"}.
    </p>
  );
}

export default PrayerStats;
