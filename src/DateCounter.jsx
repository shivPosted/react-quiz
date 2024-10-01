import { useReducer, useState } from "react";
import styles from "./DateCounter.module.css";

const dateFormatter = function (count) {
  const date = new Date(Date.now());

  date.setDate(date.getDate() + count);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    weekday: "short",
    year: "numeric",
    day: "numeric",
  }).format(date);
};

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "INC":
      return { ...state, count: state.count + state.step };
    case "DEC":
      return { ...state, count: state.count - state.step };
    case "RESET":
      return initialState;
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
  }
}
export default function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  function handleOP(action) {
    dispatch({ type: action });
  }

  function handleChange(e) {
    dispatch({ type: "SET_COUNT", payload: Number(e.target.value) });
  }

  function handleStep(e) {
    dispatch({ type: "SET_STEP", payload: Number(e.target.value) });
  }
  return (
    <div className={styles.container}>
      <div>
        <input
          min="1"
          max="10"
          type="range"
          value={step}
          onChange={handleStep}
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
