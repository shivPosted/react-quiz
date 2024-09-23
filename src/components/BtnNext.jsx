export default function BtnNext({ dispatch, answer }) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-next"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
