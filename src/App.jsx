import "./style.css";
import Header from "./components/Header";
import MainComp from "./components/MainComp";
import QuestionBox from "./components/QuestionBox";
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
import { useQuizContext } from "./components/QuizContext";

function App() {
  const { status, secondsRemaining, reviewing, showFilter } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <MainComp>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <SelectQuiz />
            {showFilter ? <Filter /> : ""}
            <StartScreen />
          </>
        )}
        {status === "start" && (
          <>
            {reviewing ? "" : <Progress />}
            <QuestionBox />
            <Footer>
              <BtnNext />
              {secondsRemaining !== null ? <Timer /> : ""}
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </MainComp>
    </div>
  );
}

export default App;
