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

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  index: 0,
  status: "loading", //NOTE: loading | ready | start | error | finished
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
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
        questions: state.questions,
        status: "ready",
        highscore: state.highscore, //NOTE: preserving highscore on restart
      };
    case "timer":
      return {
        ...state,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      throw new Error("There was an error 💥");
  }
}

function App() {
  const [
    { index, questions, status, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionNum = questions.length;
  const totalPoints = questions.reduce((accum, obj) => accum + obj.points, 0);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

        const data = await res.json();

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
          <StartScreen questionNum={questionNum} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Progress
              index={index}
              questionNum={questionNum}
              answer={answer}
              points={points}
              totalPoints={totalPoints}
            />
            <QuestionBox
              questionObj={questions[index]}
              dispatch={dispatch}
              answer={answer}
            ></QuestionBox>
            <Footer>
              <BtnNext
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionNum={questionNum}
              />
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
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
