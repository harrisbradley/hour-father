# 🙏 Hour Father

### *Daily Prayer Habit Tracker and Spiritual Journey Map*

**Hour Father** is a beautiful, reflective React web application designed to encourage regular prayer, specifically focusing on the "Our Father" (Lord's Prayer). It helps users build a consistent daily prayer routine by tracking streaks, logging prayer history, graphing statistics, and plotting prayer locations on an interactive spiritual map.

---

## ✝️ Key Features

### 📿 1. Guided Prayer & Logging
- **Guided Prayer Modal**: Opens a serene interface to guide you through reciting the "Our Father" with step-by-step reflection.
- **1-Click Logging**: Log your completed prayers instantly to your profile.
- **Elapsed Timer (Last Prayer)**: Displays a live counter showing the exact time (hours and minutes) elapsed since your last logged prayer to encourage regular (e.g. hourly) connection.

### 🔥 2. Streak & Habit System
- **Streak Counters**: Displays your current consecutive daily prayer streak alongside your all-time record streak.
- **Streak Protection**: Features smart algorithms to track daily engagement and reward consistency.
- **Confetti Celebration**: Bursts of visual celebration when hitting daily milestones or setting new record streaks.

### 🗺️ 3. Interactive Prayer Map
- **Location Logging**: Prompts for device geolocation when a prayer is logged.
- **Spiritual Travel Map**: Plots all the geographic locations where you have prayed on an interactive map, creating a visual testimony of your prayer journey.

### 📊 4. Prayer Statistics & Logs
- **Visual Trends**: Charts showing your weekly and monthly prayer frequency to help you monitor your habit consistency.
- **Visits Log**: A historical scroll of all past prayers with exact timestamps, notes, and coordinates.

### 🌗 5. UI Customization & Security
- **Dark & Light Themes**: Soft dark mode togglable via a top switch for comfortable nighttime prayer.
- **Secure Synchronization**: Firebase Firestore cloud synchronization tracks your habits and maps across devices.
- **Secure Authentication**: Email/Password sign-up and login support.

---

## 🛠️ Technology Stack
- **Framework**: React (Create React App)
- **Database/Auth**: Firebase Firestore & Firebase Authentication
- **Mapping**: Leaflet / OpenStreetMap (or Google Maps APIs)
- **Theme**: Custom CSS with native dark/light context variables
- **Notifications**: React Toastify & Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
You will need a [Firebase](https://firebase.google.com/) web project with:
- **Authentication** (Email/Password provider enabled)
- **Firestore Database** enabled

### 1. Clone the Repository
```bash
git clone https://github.com/harrisbradley/hour-father.git
cd hour-father
```

### 2. Configure Firebase
Create a `src/firebase.js` (or edit the existing one) with your Firebase config values:
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Locally
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📜 License
Built for the encouragement of prayer and spiritual growth. Pray without ceasing!

