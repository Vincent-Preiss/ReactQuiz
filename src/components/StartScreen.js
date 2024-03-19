import { useQuiz } from "../QuizContext";
import DynamicColumnsDemo from "./DynamicColumnsDemo";
import MyAutoComplete from "./MyAutoComplete";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2> Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        onClick={() =>
          dispatch({
            type: "start",
          })
        }
        className="btn btn-UI"
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
