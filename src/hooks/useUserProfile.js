// src/hooks/useUserProfile.js
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export function useUserProfile(user) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        if (!("recordStreak" in data)) {
          await setDoc(ref, { recordStreak: 0 }, { merge: true });
          data.recordStreak = 0;
        }
        setUserProfile(data);
      }
    }

    fetchProfile();
  }, [user]);

  return userProfile;
}
