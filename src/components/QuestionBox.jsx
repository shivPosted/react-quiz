import OptionList from "./OptionList";

export default function QuestionBox({
  questionObj,
  children,
  answer,
  dispatch,
}) {
  console.log(questionObj);
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
