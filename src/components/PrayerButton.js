// src/components/PrayerButton.js
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { prayerButton, prayerButtonHover } from "../styles/styles";
import { toast } from "react-toastify";

function PrayerButton({ onPrayed }) {
  const { user } = useAuth();
  const [hovering, setHovering] = useState(false);
  const [saving, setSaving] = useState(false);

  const combinedStyle = {
    ...prayerButton,
    ...(hovering ? prayerButtonHover : {}),
    opacity: saving ? 0.7 : 1,
    cursor: saving ? "not-allowed" : "pointer",
  };

  async function savePrayerDoc(location = null) {
    if (!user?.uid) {
      toast.error("❌ You must be logged in to log a prayer.");
      return;
    }

    setSaving(true);
    try {
      const docData = {
        userId: user.uid,
        prayedAt: serverTimestamp(),
      };
      if (location) {
        docData.location = location;
      }

      await addDoc(collection(db, "prayers"), docData);

      if (location) {
        toast.success("🙏 Prayer logged with location!");
      } else {
        toast.info("🙏 Prayer logged!");
      }

      onPrayed?.();
    } catch (error) {
      console.error("Error saving prayer to Firestore:", error);
      toast.error("❌ Failed to log prayer due to permission error.");
    } finally {
      setSaving(false);
    }
  }

  function handlePrayer() {
    if (!user || saving) return;

    // Check if Geolocation is supported and running in a secure context (HTTPS or localhost)
    const isSecureContext =
      window.isSecureContext ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (navigator.geolocation && isSecureContext) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          savePrayerDoc({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.warn("Location unavailable or denied:", error?.message || error);
          savePrayerDoc(null);
        },
        { timeout: 5000 }
      );
    } else {
      // Insecure HTTP origin (e.g. harrispi.local over HTTP) — log prayer directly without location
      savePrayerDoc(null);
    }
  }

  return (
    <button
      onClick={handlePrayer}
      disabled={saving}
      style={combinedStyle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {saving ? "⏳ Logging Prayer..." : "🙏 I Just Prayed"}
    </button>
  );
}

export default PrayerButton;
