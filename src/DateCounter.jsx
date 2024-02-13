import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);
  // return state + ;
  if (action.type === "inc") {
    return state+1;
  } else if (action.type === "dec") {
    return state-1;
  }else if (action.type === "setCount") {
    return action.payload;
  }else if (action.type === "setStep") {
    return action.payload;
  } 
}
function DateCounter() {
  // const [count, setCount] = useState(0);

  const [count, dispatchCount] = useReducer(reducer, 0);
  const [step, dispatchStep] = useReducer(reducer, 1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatchCount({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  }; 

  const inc = function () {
    dispatchCount({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatchCount({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatchStep({ type: "setStep", payload:Number(e.target.value)});
  };

  const reset = function () {
    dispatchCount({ type: "setCount", payload: Number(0) });
    // setCount(0);
    dispatchStep({ type: "setStep", payload:Number(1)});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
