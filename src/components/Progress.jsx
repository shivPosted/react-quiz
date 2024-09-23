export default function Progress({
  index,
  questionNum,
  answer,
  totalPoints,
  points,
}) {
  return (
    <div className="progress">
      <progress max={questionNum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionNum}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </div>
  );
}
