// src/components/ConfettiBurst.js
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";

function ConfettiBurst({ duration = 4000 }) {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(true);

  // Auto stop after `duration` ms
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return show ? <Confetti width={width} height={height} /> : null;
}

export default ConfettiBurst;
