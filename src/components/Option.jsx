export default function Option({
  children,
  optionNum,
  dispatch,
  answer,
  correctOpt,
}) {
  return (
    <button
      className={`btn btn-option ${answer || answer === 0 ? (optionNum === correctOpt ? "correct" : "wrong") : ""} ${optionNum === answer ? "answer" : ""}`}
      onClick={() => dispatch({ type: "setAnswer", payload: optionNum })}
    >
      {children}
    </button>
  );
}
