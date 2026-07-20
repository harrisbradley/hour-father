// src/components/OurFatherModal.js
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { useState } from "react";
import { colors, buttons, fonts } from "../styles/ui";

function OurFatherModal({ onClose, onPrayed }) {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handlePrayAndClose() {
    if (!user || saving) return;

    setSaving(true);
    try {
      await user.getIdToken(true).catch(() => {});

      await addDoc(collection(db, "prayers"), {
        userId: user.uid,
        prayedAt: serverTimestamp(),
        location: null,
      });

      toast.success("🙏 Prayer logged!");
      setShowConfetti(true);

      setTimeout(() => {
        onPrayed?.();
        onClose?.();
      }, 1800);
    } catch (error) {
      console.error("Error logging prayer:", error);
      toast.error("❌ Failed to log prayer.");
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(9, 13, 22, 0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div
        style={{
          backgroundColor: darkMode ? colors.darkCardBg : "#ffffff",
          color: darkMode ? colors.darkText : colors.lightText,
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
          boxShadow: darkMode
            ? "0 16px 40px rgba(0,0,0,0.6)"
            : "0 10px 30px rgba(0,0,0,0.15)",
          border: darkMode
            ? `1px solid ${colors.subtleGoldBorder}`
            : "1px solid #e2e8f0",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontFamily: fonts.sacred,
            fontSize: "1.8rem",
            margin: "0 0 1rem 0",
            color: darkMode ? colors.accent : colors.primary,
          }}
        >
          🙏 The Our Father
        </h2>

        <div
          style={{
            margin: "1.5rem 0",
            lineHeight: "2",
            fontFamily: fonts.sacred,
            fontSize: "1.1rem",
            color: darkMode ? "#f8fafc" : "#1e293b",
            fontStyle: "italic",
          }}
        >
          Our Father, who art in heaven, <br />
          hallowed be thy name. <br />
          Thy kingdom come, <br />
          thy will be done, <br />
          on earth as it is in heaven. <br />
          Give us this day our daily bread, <br />
          and forgive us our trespasses, <br />
          as we forgive those who trespass against us. <br />
          And lead us not into temptation, <br />
          but deliver us from evil. Amen.
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <button
            onClick={handlePrayAndClose}
            disabled={saving}
            style={{
              ...buttons.base,
              ...buttons.accent,
              padding: "0.75rem 1.8rem",
              fontSize: "1rem",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "⏳ Logging..." : "🙏 Complete Prayer"}
          </button>

          <button
            onClick={onClose}
            style={{
              ...buttons.base,
              ...buttons.secondary,
              padding: "0.75rem 1.4rem",
              fontSize: "0.95rem",
              opacity: 0.8,
            }}
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OurFatherModal;
