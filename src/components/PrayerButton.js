// import react
import { useState } from "react";

// src/components/PrayerButton.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

// import styles
import { prayerButton, prayerButtonHover } from "../styles/styles";
import { toast } from "react-toastify";

function PrayerButton({ onPrayed }) {
  const { user } = useAuth();
  const [hovering, setHovering] = useState(false); // ✅ track hover state

  // 👇 combine base and hover styles
  const combinedStyle = {
    ...prayerButton,
    ...(hovering ? prayerButtonHover : {}),
  };

  async function handlePrayer() {
    if (!user) return;
  
    // 🧭 Step 1: Try to get current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          await addDoc(collection(db, "prayers"), {
            userId: user.uid,
            prayedAt: serverTimestamp(),
            location: {
              lat: latitude,
              lng: longitude,
            },
          });
  
          toast.success("🙏 Prayer logged with location!");
          onPrayed?.();
        } catch (error) {
          console.error("Error saving prayer:", error);
          toast.error("❌ Prayer failed to save.");
        }
      },
      (error) => {
        console.warn("Location permission denied or unavailable", error);
  
        // 📍 Fallback if location fails — still log the prayer
        addDoc(collection(db, "prayers"), {
          userId: user.uid,
          prayedAt: serverTimestamp(),
        });
  
        toast.warn("🙏 Prayer logged, but no location available.");
      }
    );
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
