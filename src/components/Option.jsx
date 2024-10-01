import { useQuizContext } from "./QuizContext";

export default function Option({ children, optionNum, answer, correctOpt }) {
  const { dispatch } = useQuizContext();
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
