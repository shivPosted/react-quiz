export default function Option({
  children,
  optionNum,
  dispatch,
  answer,
  correctOpt,
}) {
  return (
    <button
      className={`btn btn-option ${answer !== null ? (optionNum === correctOpt ? "correct" : "wrong") : ""} ${optionNum === answer ? "answer" : ""}`}
      onClick={() => dispatch({ type: "setAnswer", payload: optionNum })}
      disabled={answer !== null}
    >
      {children}
    </button>
  );
}
