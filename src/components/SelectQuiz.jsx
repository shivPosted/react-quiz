export default function SelectQuiz({ dispatch }) {
  return (
    <select
      name="select-quiz"
      id=""
      onChange={(e) =>
        dispatch({ type: "selectQuiz", payload: e.target.value })
      }
    >
      <option value="react">React</option>
      <option selected value="all">
        Select Tech
      </option>
      <option value="javascript">JavaScript</option>
      <option value="cpp">C++</option>
      <option value="python">Python</option>
    </select>
  );
}
