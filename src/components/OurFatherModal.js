// src/components/OurFatherModal.js
import React from "react";

function OurFatherModal({ onClose, onPrayed }) {
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
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <h2>🙏 The Our Father</h2>
        <p style={{ margin: "1.5rem 0", lineHeight: "1.8" }}>
          Our Father, who art in heaven, hallowed be thy name. <br />
          Thy kingdom come, thy will be done, on earth as it is in heaven. <br />
          Give us this day our daily bread, and forgive us our trespasses, <br />
          as we forgive those who trespass against us. <br />
          And lead us not into temptation, but deliver us from evil. Amen.
        </p>

        {/* 👉 Button Row */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={onPrayed}
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
