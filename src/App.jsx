import "./style.css";
import Header from "./components/Header";
import MainComp from "./components/MainComp";
import QuestionBox from "./components/QuestionBox";
import { useEffect, useState } from "react";
function App() {
  const [questionNum, setQuestionNum] = useState(1);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

        const data = await res.json();
        console.log(data);
        setQuestions(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchQuestions();
  }, []);

  function handleNext() {
    setQuestionNum((cur) => cur + 1);
  }
  return (
    <>
      <Header />;
      <MainComp>
        <div>
          <p>Question 1/15</p>
          <p>0 / 280</p>
        </div>
        <QuestionBox
          handleNext={handleNext}
          questionObj={questions[questionNum]}
        />
      </MainComp>
    </>
  );
}

export default App;
