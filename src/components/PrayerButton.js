// import react
import { useState } from "react";

// src/components/PrayerButton.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

// import styles
import { prayerButton, prayerButtonHover } from "../styles";

function PrayerButton() {
  const { user } = useAuth();
  const [hovering, setHovering] = useState(false); // ✅ track hover state

  // 👇 combine base and hover styles
  const combinedStyle = {
    ...prayerButton,
    ...(hovering ? prayerButtonHover : {}),
  };

  async function handlePrayer() {
    try {
      await addDoc(collection(db, "prayers"), {
        userId: user.uid, // 🔐 who prayed
        prayedAt: serverTimestamp(), // ⏰ when they prayed
      });

      alert("🙏 Prayer logged!");
    } catch (error) {
      console.error("Error logging prayer:", error);
      alert("❌ Failed to log prayer.");
    }
  }

  return (
    <button
      onClick={handlePrayer}
      style={combinedStyle}
      onMouseEnter={() => setHovering(true)} // ✅ activate hover
      onMouseLeave={() => setHovering(false)} // ✅ deactivate hover
    >
      🙏 I Just Prayed
    </button>
  );
}

export default PrayerButton;
