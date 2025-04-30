// src/components/PrayerButton.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function PrayerButton() {
  const { user } = useAuth();

  async function handlePrayer() {
    try {
      await addDoc(collection(db, "prayers"), {
        userId: user.uid,          // 🔐 who prayed
        prayedAt: serverTimestamp() // ⏰ when they prayed
      });

      alert("🙏 Prayer logged!");
    } catch (error) {
      console.error("Error logging prayer:", error);
      alert("❌ Failed to log prayer.");
    }
  }

  return (
    <button onClick={handlePrayer} style={{ padding: "1rem", fontSize: "1.2rem", marginTop: "2rem" }}>
      🙏 I Just Prayed
    </button>
  );
}

export default PrayerButton;
