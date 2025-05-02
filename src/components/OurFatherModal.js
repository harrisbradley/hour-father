// src/components/OurFatherModal.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function OurFatherModal({ onClose, onPrayed }) {
  const { user } = useAuth();

  async function handlePrayer() {
    try {
      await addDoc(collection(db, "prayers"), {
        userId: user.uid,
        prayedAt: serverTimestamp(),
        location: null, // optional, you can add location logic later
      });

      // Close the modal
      onPrayed();
    } catch (error) {
      console.error("Error logging prayer:", error);
      alert("❌ Failed to log prayer.");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>🙏 The Our Father</h2>
        <p style={{ lineHeight: "1.6", marginBottom: "2rem" }}>
          Our Father, who art in heaven, <br />
          hallowed be thy name. <br />
          Thy kingdom come, thy will be done, <br />
          on earth as it is in heaven. <br />
          Give us this day our daily bread, <br />
          and forgive us our trespasses, <br />
          as we forgive those who trespass against us. <br />
          And lead us not into temptation, <br />
          but deliver us from evil. <br />
          Amen.
        </p>
        <button
          onClick={handlePrayer}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#198754",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🙏 I Just Prayed
        </button>
      </div>
    </div>
  );
}

export default OurFatherModal;
