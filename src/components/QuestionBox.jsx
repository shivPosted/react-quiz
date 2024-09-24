import OptionList from "./OptionList";
import ReviewList from "./ReviewList";

export default function QuestionBox({
  questionObj,
  children,
  answer,
  dispatch,
  reviewing,
  quesIndex,
  answerArr,
}) {
  console.log(questionObj);
  if (reviewing)
    return (
      <div>
        <h4>{questionObj?.question}</h4>
        <ReviewList
          correctOpt={questionObj.correctOption}
          options={questionObj?.options}
          answerUser={answerArr[quesIndex]}
        />
        {children}
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextReview" })}
        >
          Next
        </button>
      </div>
    );
  return (
    <div>
      <h4>{questionObj?.question}</h4>
      <OptionList
        correctOpt={questionObj.correctOption}
        options={questionObj?.options}
        dispatch={dispatch}
        answer={answer}
      />
      {children}
    </div>
  );
}
