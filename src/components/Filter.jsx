import { useQuizContext } from "./QuizContext";

export default function Filter() {
  const { dispatch } = useQuizContext();
  return (
    <select
      name="filter"
      id=""
      onChange={(e) => dispatch({ type: "filter", payload: e.target.value })}
    >
      <option value="easy">Easy</option>
      <option selected>Mixed</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
}
