// src/components/Layout.js
import Header from "./Header";
import OurFatherModal from "./OurFatherModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getContainerStyles } from "../styles/styles";

function Layout({
  darkMode,
  userName,
  onToggleProfile,
  showPrayerModal,
  onClosePrayerModal,
  onPrayed,
  children,
}) {
  return (
    <div style={getContainerStyles(darkMode)}>
      <Header onToggleProfile={onToggleProfile} userName={userName} />
      
      {children}

      {showPrayerModal && (
        <OurFatherModal onClose={onClosePrayerModal} onPrayed={onPrayed} />
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Layout;
