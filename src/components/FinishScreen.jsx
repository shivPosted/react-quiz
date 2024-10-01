import { useQuizContext } from "./QuizContext";

export default function FinishScreen() {
  const { points, totalPoints, dispatch, highscore } = useQuizContext();
  const percentage = Math.trunc((points / totalPoints) * 100);

  let emoji = "🥇";
  if (percentage === 0) emoji = "👎";
  else if (percentage > 0 && percentage <= 50) emoji = "😞";
  else if (percentage > 50 && percentage <= 80) emoji = "🤗";
  else if (percentage > 80 && percentage < 100) emoji = "🥳";

  return (
    <>
      <p className="result">
        {emoji} You Scored <strong>{points}</strong> out of {totalPoints}(
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <div className="finish-btns">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "review" })}
        >
          Review
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
}
