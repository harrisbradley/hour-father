// src/hooks/useUserProfile.js
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export function useUserProfile(user) {
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setUserProfile(null);
        setLoadingProfile(false);
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          if (!("recordStreak" in data)) {
            await setDoc(ref, { recordStreak: 0 }, { merge: true }).catch(() => {});
            data.recordStreak = 0;
          }

          setUserProfile(data);
        } else {
          // Fallback if doc doesn't exist yet
          setUserProfile({
            name: user.displayName || user.email?.split("@")[0] || "User",
            recordStreak: 0,
          });
        }
      } catch (err) {
        console.warn("Firestore user profile fetch error:", err);
        // Fallback profile so permission errors never lock the UI in a blank screen
        setUserProfile({
          name: user.displayName || user.email?.split("@")[0] || "User",
          recordStreak: 0,
        });
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [user]);

  return { userProfile, loadingProfile };
}
