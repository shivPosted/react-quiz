import Option from "./Option";

export default function OptionList({ options, correctOpt, dispatch, answer }) {
  return (
    <div className="options">
      {options?.map((option, i) => (
        <Option
          key={option}
          correctOpt={correctOpt}
          optionNum={i}
          dispatch={dispatch}
          answer={answer}
        >
          {option}{" "}
        </Option>
      ))}
    </div>
  );
}
