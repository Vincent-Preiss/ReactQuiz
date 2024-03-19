import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
function QuizProvider({ children }) {
  const SECS_PER_QUESTION = 30;
  const initialState = {
    questions: [],
    //'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: SECS_PER_QUESTION * state.questions.length,
        };
      case "newAnswer":
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index++,
          answer: null,
        };
      case "finish":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...state,
          status: "active",
          index: 0,
          points: 0,
          answer: null,
          secondsRemaining: SECS_PER_QUESTION * state.questions.length,
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,

          status: state.secondsRemaining === 0 ? "finished" : state.status,
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      default:
        throw new Error("Action unknown");
    }
  }
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "dataFailed",
        });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz Context was used outside of QuizProvider");
  return context;
}
export { QuizProvider, useQuiz };
