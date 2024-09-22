import Option from "./Option";

export default function OptionList({ options }) {
  return (
    <div className="options">
      {options?.map((option) => (
        <Option key={option}>{option} </Option>
      ))}
    </div>
  );
}
