import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./main.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./startScreen.jsx";
import Question from "./question.jsx";
import Progress from "./progress.jsx";
import FinishedScreen from "./finishedScreen.jsx";

const SECS_PER_QUESTIONS = 40;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  totalPoints: 0,
  secondsRemainig: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      let totalPoints = 0;

      let questions = action.payload;
      questions.map((ele) => {
        totalPoints += ele.points;
      });

      return {
        ...state,
        questions: action.payload,
        status: "ready",
        totalPoints: totalPoints,
        secondsRemainig : action.payload.length * SECS_PER_QUESTIONS
      };
    case "payload":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points: state.points + action.points,
      };
    case "previous":
      return {
        ...state,
        index: action.payload,
      };
    case "next":
      return {
        ...state,
        index: action.payload,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "tick":
      
      return {
        ...state,
        secondsRemainig: state.secondsRemainig - 1,
        status:state.secondsRemainig === 0 ? 'finished' : 'active'
      };
    case "restart": {
      let totalPoints = 0;

      let questions = state.questions;
      questions.map((ele) => {
        totalPoints += ele.points;
      });
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        totalPoints: totalPoints,
      };
    }
    default:
      return {
        questions: [],
        status: "loading",
      };
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, totalPoints, secondsRemainig },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://restful-api-vercel-pi.vercel.app/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "", payload: err.message }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} questions={questions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              totalPoints={totalPoints}
              questions={questions}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              index={index}
              questions={questions}
              secondsRemainig={secondsRemainig}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            dispatch={dispatch}
            totalPoints={totalPoints}
          />
        )}
      </Main>
    </div>
  );
}
