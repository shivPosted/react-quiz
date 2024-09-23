export default function FinishScreen({ points, totalPoints, dispatch }) {
  const percentage = Math.trunc((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {totalPoints}({percentage}%)
      </p>
      <p className="highscore">(Highscore: {points} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
