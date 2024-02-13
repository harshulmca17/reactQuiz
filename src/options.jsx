export default function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            key={index}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${answer  != null ? index === question.correctOption ? "correct" : "wrong" : ""}`}
            disabled={answer != null}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: index ,points : index === question.correctOption ? question.points : 0});
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
