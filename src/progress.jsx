export default function Progress({
  index,
  questions,
  points,
  totalPoints,
  answer,
}) {
  return (
    <div className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      />
      <p>
        Questions <strong>{index+1}</strong>/ {questions.length}
      </p>
      <p>
        <strong>{points}</strong>/ {totalPoints}
      </p>
    </div>
  );
}
