import Option from "./Option";
import { useQuizContext } from "./QuizContext";

export default function OptionList({ options, correctOpt }) {
  const { answer } = useQuizContext();

  return (
    <div className="options">
      {options?.map((option, i) => (
        <Option
          key={option}
          correctOpt={correctOpt}
          optionNum={i}
          answer={answer}
        >
          {option}{" "}
        </Option>
      ))}
    </div>
  );
}
