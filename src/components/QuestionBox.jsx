import OptionList from "./OptionList";
import { useQuizContext } from "./QuizContext";
import ReviewList from "./ReviewList";

export default function QuestionBox() {
  const { index, questions, dispatch, reviewing, answerArr } = useQuizContext();

  const questionObj = questions[index];

  console.log(questionObj);
  if (reviewing)
    return (
      <div>
        <h4>{questionObj?.question}</h4>
        <ReviewList
          correctOpt={questionObj.correctOption}
          options={questionObj?.options}
          answerUser={answerArr[index]}
        />
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
      />
    </div>
  );
}
