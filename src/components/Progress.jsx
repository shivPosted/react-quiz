export default function Progress({ index, questionNum, answer }) {
  return (
    <div className="progress">
      <progress max={questionNum} value={index + Number(answer !== null)} />
      <div>
        Question <strong>{index + 1}</strong> / {questionNum}
      </div>
    </div>
  );
}
