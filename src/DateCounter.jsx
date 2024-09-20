import { useState } from "react";
import styles from "./DateCounter.module.css";

const dateFormatter = function (count) {
  const date = new Date(Date.now());
  console.log(date);

  date.setDate(date.getDate() + count);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    weekday: "short",
    year: "numeric",
    day: "numeric",
  }).format(date);
};

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleReset() {
    setStep(1);
    setCount(0);
  }
  return (
    <div className={styles.container}>
      <div>
        <input
          min="1"
          max="10"
          type="range"
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={() => setCount((cur) => cur - step)}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
        <button onClick={() => setCount((cur) => cur + step)}>+</button>
      </div>
      <p>{dateFormatter(count)}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
