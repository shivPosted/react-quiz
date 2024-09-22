import Option from "./Option";

export default function OptionList({ options }) {
  return (
    <ul>
      {options?.map((option) => (
        <Option key={option}>{option} </Option>
      ))}
    </ul>
  );
}
