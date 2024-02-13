import Options from "./options";
import Timer from "./times";

export default function Question({ questions, dispatch, index, answer ,secondsRemainig}) {
  let question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />

      {index < questions.length - 1 && (
        <>
          <Timer dispatch={dispatch} secondsRemainig={secondsRemainig} />
          <button
            className="btn btn-ui"
            onClick={() => {
              dispatch({ type: "next", payload: index + 1 });
            }}
          >
            Next
          </button>
        </>
      )}
      {index === questions.length - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "finish" });
          }}
        >
          Finish
        </button>
      )}
    </div>
  );
}
