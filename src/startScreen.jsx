export default function StartScreen({ questions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} Question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({
            type: "startQuiz",
          });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}
