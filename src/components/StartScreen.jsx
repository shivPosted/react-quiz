export default function StartScreen({ questionNum, dispatch, techSelected }) {
  return (
    <div className="start">
      <h2>Welcome to the Tech Quiz</h2>
      <h3>
        {questionNum} questions to test your{" "}
        {techSelected
          ? techSelected[0].toUpperCase() + techSelected.slice(1)
          : "Tech"}{" "}
        mastery.
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}
