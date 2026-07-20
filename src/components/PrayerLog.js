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
            prayedAt: data.prayedAt?.toDate()
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
        marginTop: "2rem",
        maxWidth: "400px",
        marginInline: "auto",
        backgroundColor: darkMode ? "#1e293b" : "#ffffff",
        border: darkMode ? "1px solid rgba(245, 197, 24, 0.2)" : "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "1.25rem",
        color: darkMode ? "#f8fafc" : "#0f172a",
        boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>📜 Last 5 Prayers</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {prayers.map((prayer) => (
          <li
            key={prayer.id}
            style={{
              borderBottom: darkMode ? "1px solid #334155" : "1px solid #f1f5f9",
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
          <li style={{ fontStyle: "italic", color: darkMode ? "#94a3b8" : "#64748b" }}>
            No prayers logged yet.
          </li>
        )}
      </ul>
    </div>
  );
}

export default PrayerLog;
