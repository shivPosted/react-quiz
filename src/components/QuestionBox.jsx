import OptionList from "./OptionList";

export default function QuestionBox({ handleNext, questionObj }) {
  console.log(questionObj);
  return (
    <div>
      <p>{questionObj?.question}</p>
      <OptionList options={questionObj?.options} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
