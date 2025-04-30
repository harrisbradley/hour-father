// src/components/PrayerButton.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

// import styles
import { prayerButton } from "../styles";

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
    <button onClick={handlePrayer} style={prayerButton}>
  🙏 I Just Prayed
</button>
  );
}

export default PrayerButton;
