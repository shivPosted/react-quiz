import { useQuizContext } from "./QuizContext";

export default function Progress() {
  const { index, questionNum, answer, points, totalPoints } = useQuizContext();
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
