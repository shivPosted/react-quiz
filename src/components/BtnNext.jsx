export default function BtnNext({ dispatch, answer, questionNum, index }) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-next"
      onClick={() => {
        if (questionNum - 1 === index) return dispatch({ type: "finish" });
        dispatch({ type: "nextQuestion" });
      }}
    >
      {questionNum - 1 === index ? "Finish" : "Next"}
    </button>
  );
}
