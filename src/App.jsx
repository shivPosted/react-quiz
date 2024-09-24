import "./style.css";
import Header from "./components/Header";
import MainComp from "./components/MainComp";
import QuestionBox from "./components/QuestionBox";
import { useEffect, useReducer, useState } from "react";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import BtnNext from "./components/BtnNext";
import Timer from "./components/Timer";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import SelectQuiz from "./components/SelectQuiz";

const SEC_PER_QUESTION = 30;

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

function difficultyFilterQues(questions, difficulty, techSelected) {
  console.log(questions, difficulty);
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

function filterQuestionTechStack(questions, tech) {
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

function App() {
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
  console.log(questionNum);
  console.log(questions);

  const totalPoints = questions.reduce((accum, obj) => accum + obj.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://shivposted.github.io/tech-quiz-react/data/db.json", //WARN: using github.io to fake api call
        );
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

        const { questions: data } = await res.json();

        console.log(data);
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "error" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <MainComp>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <SelectQuiz dispatch={dispatch} />
            {showFilter ? <Filter dispatch={dispatch} /> : ""}
            <StartScreen
              questionNum={questionNum}
              dispatch={dispatch}
              techSelected={techSelected}
            />
          </>
        )}
        {status === "start" && (
          <>
            {reviewing ? (
              ""
            ) : (
              <Progress
                index={index}
                questionNum={questionNum}
                answer={answer}
                points={points}
                totalPoints={totalPoints}
              />
            )}
            <QuestionBox
              questionObj={questions[index]}
              quesIndex={index}
              dispatch={dispatch}
              answer={answer}
              reviewing={reviewing}
              answerArr={answerArr}
            ></QuestionBox>
            <Footer>
              <BtnNext
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionNum={questionNum}
              />
              {secondsRemaining !== null ? (
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                />
              ) : (
                ""
              )}
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </MainComp>
    </div>
  );
}

export default App;
