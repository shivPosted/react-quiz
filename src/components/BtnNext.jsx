import { useQuizContext } from "./QuizContext";

export default function BtnNext() {
  const { dispatch, answer, index, questionNum } = useQuizContext();
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        if (questionNum - 1 === index) return dispatch({ type: "finish" });
        dispatch({ type: "nextQuestion" });
      }}
    >
      {questionNum - 1 === index ? "Finish" : "Next"}
    </button>
  );
}
