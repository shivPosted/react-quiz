export default function StartScreen({ questionNum, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{questionNum} questions to test your react mastery.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}
