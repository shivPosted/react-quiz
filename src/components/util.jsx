export const SEC_PER_QUESTION = 30;

export function difficultyFilterQues(questions, difficulty, techSelected) {
  if (difficulty === "easy") {
    return questions.filter(
      (obj) => obj.points === 10 && obj.tech === techSelected,
    );
  }
  if (difficulty === "medium") {
    return questions.filter(
      (obj) => obj.points === 20 && obj.tech === techSelected,
    );
  }
  if (difficulty === "hard") {
    return questions.filter(
      (obj) => obj.points === 30 && obj.tech === techSelected,
    );
  } else return questions.filter((obj) => obj.tech === techSelected);
}

export function filterQuestionTechStack(questions, tech) {
  switch (tech) {
    case "react":
      return questions.filter((obj) => obj.tech === "react");
    case "javascript":
      return questions.filter((obj) => obj.tech === "javascript");
    case "cpp":
      return questions.filter((obj) => obj.tech === "cpp");
    case "python":
      return questions.filter((obj) => obj.tech === "python");
    default:
      return questions;
  }
}
