// src/components/PrayerLog.js
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";


function PrayerLog({ darkMode, refreshKey }) {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    async function fetchPrayers() {
      if (!user) return;

      const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid),
        orderBy("prayedAt", "desc"),
        limit(5) // ✅ Only get the latest 5
      );

      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          prayedAt: data.prayedAt?.toDate()
        };
      });

      setPrayers(results);
    }

    fetchPrayers();
  }, [user, refreshKey]);

  return (
    <div
    style={{
      marginTop: "2rem",
      maxWidth: "400px",
      marginInline: "auto",
      backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      color: darkMode ? "#f5f5f5" : "#222",
    }}
  >
    <h3>📜 Last 5 Prayers</h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {prayers.map((prayer) => (
        <li
          key={prayer.id}
          style={{
            borderBottom: "1px solid #555",
            padding: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          {prayer.prayedAt
            ? prayer.prayedAt.toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short"
              })
            : "Pending..."}
        </li>
      ))}
      {prayers.length === 0 && (
        <li style={{ fontStyle: "italic", color: darkMode ? "#aaa" : "#665" }}>
          No prayers logged yet.
        </li>
      )}
    </ul>
  </div>
  
  );
}

export default PrayerLog;
