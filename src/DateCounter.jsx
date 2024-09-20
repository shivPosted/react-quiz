import { useReducer, useState } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    case "INC":
      return state + action.payload;
    case "DEC":
      return state - action.payload;
    case "RESET":
      return 0;
    case "CHANGE":
      return action.payload;
  }
}
export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, dispatch] = useReducer(reducer, 0);

  function handleReset() {
    setStep(1);
    dispatch({ type: "RESET" });
  }

  function handleOP(action) {
    dispatch({ type: action, payload: step });
  }

  function handleChange(e) {
    dispatch({ type: "CHANGE", payload: Number(e.target.value) });
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
        <button onClick={() => handleOP("DEC")}>-</button>
        <input type="number" value={count} onChange={handleChange} />
        <button onClick={() => handleOP("INC")}>+</button>
      </div>
      <p>{dateFormatter(count)}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
