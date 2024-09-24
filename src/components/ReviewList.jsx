export default function ReviewList({ options, correctOpt, answerUser }) {
  return (
    <div className="options">
      {options?.map((option, i) => (
        <button
          className={`btn btn-option ${correctOpt === i ? "correct" : "wrong"} ${answerUser === i ? "answer" : ""}`}
          key={option}
          disabled
        >
          {option}
        </button>
      ))}
    </div>
  );
}
