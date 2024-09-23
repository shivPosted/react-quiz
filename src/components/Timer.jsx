import React, { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const min = Math.trunc(secondsRemaining / 60);
  const sec = Math.trunc(secondsRemaining % 60);

  const timeString = `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return <div className="timer">{timeString}</div>;
}
