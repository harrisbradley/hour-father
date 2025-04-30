// src/components/PrayerLog.js
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

function PrayerLog() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    async function fetchPrayers() {
      if (!user) return;

      const q = query(
        collection(db, "prayers"),
        where("userId", "==", user.uid),
        orderBy("prayedAt", "desc")
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
  }, [user]);

  return (
    <div style={{ marginTop: "2rem", maxWidth: "400px", marginInline: "auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>📜 Prayer Log</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {prayers.map((prayer) => (
          <li
            key={prayer.id}
            style={{
              borderBottom: "1px solid #ccc",
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
          <li style={{ fontStyle: "italic", color: "#666" }}>
            No prayers logged yet.
          </li>
        )}
      </ul>
    </div>
  );
}

export default PrayerLog;
