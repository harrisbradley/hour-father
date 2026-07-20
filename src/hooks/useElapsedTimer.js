// src/hooks/useElapsedTimer.js
import { useState, useEffect } from "react";

export function useElapsedTimer(lastPrayerDate) {
  const [elapsedFormatted, setElapsedFormatted] = useState("--h : --m : --s");
  const [elapsedHours, setElapsedHours] = useState(0);
  const [status, setStatus] = useState("fresh");

  useEffect(() => {
    function calculateElapsed() {
      if (!lastPrayerDate) {
        setElapsedFormatted("--h : --m : --s");
        setElapsedHours(0);
        setStatus("overdue");
        return;
      }

      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - lastPrayerDate.getTime());
      
      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, "0");
      setElapsedFormatted(`${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`);
      setElapsedHours(hours);

      if (hours < 1) {
        setStatus("fresh");
      } else if (hours < 3) {
        setStatus("due");
      } else {
        setStatus("overdue");
      }
    }

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);

    return () => clearInterval(interval);
  }, [lastPrayerDate]);

  return { elapsedFormatted, elapsedHours, status };
}
