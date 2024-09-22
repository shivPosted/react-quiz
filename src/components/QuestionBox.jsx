import OptionList from "./OptionList";

export default function QuestionBox({ questionObj, dispatch }) {
  console.log(questionObj);
  return (
    <div>
      <p>{questionObj?.question}</p>
      <OptionList options={questionObj?.options} />
      <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    </div>
  );
}
