// src/components/OurFatherModal.js
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function OurFatherModal({ onClose, onPrayed }) {
  const { user } = useAuth();
  const { darkMode } = useTheme(); // 🌙 Access dark mode state

  // 🙏 Handle logging a prayer
  async function handlePrayAndClose() {
    if (!user) return;

    try {
      await addDoc(collection(db, "prayers"), {
        userId: user.uid,
        prayedAt: serverTimestamp(),
        location: null, // optional
      });

      toast.success("🙏 Prayer logged!");
      onPrayed(); // 🔄 trigger data refresh
    } catch (error) {
      console.error("Error logging prayer:", error);
      toast.error("❌ Failed to log prayer.");
    }
  }

  // 🎨 Modal styles based on dark/light mode
  const modalStyles = {
    backgroundColor: darkMode ? "#1e1e1e" : "white",
    color: darkMode ? "#f1f1f1" : "#000",
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div style={modalStyles}>
        <h2>🙏 The Our Father</h2>
        <p style={{ margin: "1.5rem 0", lineHeight: "1.8" }}>
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
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={handlePrayAndClose}
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🙏 I Just Prayed
          </button>

          <button
            onClick={onClose}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
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
