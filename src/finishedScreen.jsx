export default function FinishedScreen({ points, totalPoints,dispatch }) {
  let percentage = (points / totalPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints}{" "}
        ({Math.ceil(percentage)}%)
      </p>
      <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "restart" });
          }}
        >
          Restart
        </button>
    </div>
  );
}
