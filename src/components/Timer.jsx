import React, { useEffect, useState } from "react";

export default function Timer({ seconds = 30, onExpire, isRunning, resetKey }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  // Reset timer whenever resetKey (like question index) or seconds changes
  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds, resetKey]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const t = setTimeout(() => setTimeLeft((tl) => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isRunning, onExpire]);

  return (
    <div className="px-3 py-1 rounded-full bg-slate-700 text-sm">
      ⏱ {timeLeft}s
    </div>
  );
}
