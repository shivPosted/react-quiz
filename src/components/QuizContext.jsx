import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SEC_PER_QUESTION,
  difficultyFilterQues,
  filterQuestionTechStack,
} from "./util";

const QuizContext = createContext();

const initialState = {
  questions: [],
  index: 0,
  status: "loading", //NOTE: loading | ready | start | error | finished
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  fetchedQuestions: null,
  reviewing: false,
  answerArr: [],
  showFilter: false,
  techSelected: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        fetchedQuestions: action.payload,
      };
    case "error":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "setAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          state.questions.at(state.index).correctOption === action.payload
            ? state.points + state.questions.at(state.index).points
            : state.points,
        answerArr: [...state.answerArr, action.payload],
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.fetchedQuestions,
        status: "ready",
        highscore: state.highscore, //NOTE: preserving highscore on restart
        fetchedQuestions: state.fetchedQuestions,
      };
    case "timer":
      return {
        ...state,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "filter":
      return {
        ...state,
        questions: difficultyFilterQues(
          state.fetchedQuestions,
          action.payload,
          state.techSelected,
        ),
        status: "ready",
        // secondsRemaining:
        //   difficultyFilterQues(state.fetchedQuestions, action.payload).length *
        //   SEC_PER_QUESTION,
      };
    case "selectQuiz":
      return {
        ...state,
        showFilter: action.payload === "all" ? false : true,
        questions: filterQuestionTechStack(
          state.fetchedQuestions,
          action.payload,
        ),
        techSelected: action.payload,
      };
    case "review":
      return {
        ...state,
        status: "start",
        reviewing: true,
        index: 0,
        answer: null,
        secondsRemaining: null,
      };

    case "nextReview":
      return {
        ...state,
        index: state.index + 1,
        status: state.index === state.questions.length - 1 ? "finish" : "start",
      };
    default:
      throw new Error("There was an error 💥");
  }
}

function QuizContextProvider({ children }) {
  const [
    {
      index,
      questions,
      status,
      answer,
      points,
      highscore,
      secondsRemaining,
      reviewing,
      answerArr,
      showFilter,
      techSelected,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionNum = questions.length;

  const totalPoints = questions.reduce((accum, obj) => accum + obj.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://shivposted.github.io/tech-quiz-react/data/db.json", //WARN: using github.io to fake api call
        );
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

        const { questions: data } = await res.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        index,
        questions,
        status,
        answer,
        points,
        highscore,
        secondsRemaining,
        reviewing,
        answerArr,
        showFilter,
        techSelected,
        questionNum,
        totalPoints,

        dispatch,
        questionObj: questions[index],
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("The quiz context is used outside of where it is provided");

  return context;
}

export { QuizContextProvider, useQuizContext };
