import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemainig }) {
    var mind = secondsRemainig;
var minutes = Math.floor(mind / 60);
         
var secd = mind % 60;
var seconds = Math.ceil(secd);
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      <p>{minutes} : {seconds}</p>
    </div>
  );
}
