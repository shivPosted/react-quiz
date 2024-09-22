import "./style.css";
import Header from "./components/Header";
import MainComp from "./components/MainComp";
import QuestionBox from "./components/QuestionBox";
import { useEffect, useReducer, useState } from "react";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import BtnNext from "./components/BtnNext";

const initialState = {
  questions: [],
  index: 0,
  status: "loading", //NOTE: loading | ready | start | error | finished
  answer: null,
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
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "setAnswer":
      return { ...state, answer: action.payload };
    default:
      throw new Error("There was an error 💥");
  }
}
function App() {
  const [{ index, questions, status, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const questionNum = questions.length;
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

  // function handleNext() {
  //   setQuestionNum((cur) => cur + 1);
  // }
  // function handlePrev() {
  //   setQuestionNum((cur) => cur === questions.length - 1 ?  cur - 1);
  // }
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
          <QuestionBox
            questionObj={questions[index]}
            dispatch={dispatch}
            answer={answer}
          >
            <BtnNext dispatch={dispatch} />
          </QuestionBox>
        )}
      </MainComp>
    </div>
  );
}

export default App;
