import OptionList from "./OptionList";

export default function QuestionBox({ questionObj, children }) {
  console.log(questionObj);
  return (
    <div>
      <h3>{questionObj?.question}</h3>
      <OptionList options={questionObj?.options} />
      {children}
    </div>
  );
}
