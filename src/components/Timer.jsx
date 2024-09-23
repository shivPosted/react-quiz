import React, { useRef, useEffect, useState } from "react";

export default function Timer() {
  const [timeString, setTimeString] = useState("");
  const time = useRef(10 * 60);
  useEffect(() => {
    setInterval(() => {
      const min = String(time.current / 60).padStart(2, 0);
      const sec = String(time.current % 60).padStart(2, 0);
      const string = `${min}:${sec}`;
      time.current = time.current - 1;
      setTimeString(string);
    }, 1000);
  }, []);
  return (
    <button className="btn btn-ui" disabled>
      {timeString}
    </button>
  );
}
