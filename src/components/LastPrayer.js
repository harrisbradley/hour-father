// src/components/LastPrayer.js
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function LastPrayer({ refreshKey }) {
  const { user } = useAuth();
  const [lastTime, setLastTime] = useState(null);

  useEffect(() => {
    async function fetchLastPrayer() {
      if (!user) return;

      const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid),
        orderBy("prayedAt", "desc"), // ⬇️ Most recent first
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();

        // Convert Firestore timestamp to JS Date
        const date = data.prayedAt?.toDate();
        setLastTime(date);
      } else {
        setLastTime(null);
      }
    }

    fetchLastPrayer();
  }, [user, refreshKey]);

  // 🧠 Format date and time
  function formatDateTime(date) {
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
      {lastTime
        ? `Your last prayer was on ${formatDateTime(lastTime)}`
        : `You haven’t logged a prayer yet.`}
    </p>
  );
}

export default LastPrayer;
