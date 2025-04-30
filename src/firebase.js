// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGxE9x77Zcexa0JOZtTzSm6_N9K57J45E",
    authDomain: "hour-father-app.firebaseapp.com",
    projectId: "hour-father-app",
    storageBucket: "hour-father-app.firebasestorage.app",
    messagingSenderId: "34997060565",
    appId: "1:34997060565:web:ac4408ec4f3a7f3817f35c"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);