import { useRef, useState, useEffect } from "react";

const CountDownTimer = () => {
  //initial timer values
  let [timeLeft, setTimeLeft] = useState(60); // initial value of timer
  let timerRef = useRef(null); // used for holding the interval Ids

  // function to start the timer
  const startTimer = () => {
    if (timerRef.current) return; // this avoids causing the multiple intervals
    timerRef.current = setInterval(() => {
      setTimeLeft((prevtime) => {
        if (prevtime <= 1) {
          // checking whether times has reached 1 and below, to remove it from ui
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prevtime - 1;
      });
    }, 1000); // timer updates every sec
  };

  // function to stop the timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  // function to reset the timer
  const resetTimer = () => {
    stopTimer();
    setTimeLeft(60);
  };
  // useEffect to clear the timer from the component - unmounting
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card text-center shadow my-5 justify-content-center align-items-center"
        style={{ width: "90rem", height: "40rem" }}
      >
        <h1 className="display my-3">{timeLeft} Seconds</h1>
        <div className="buttons d-flex justify-content-center my-3">
          <button className="btn btn-success" onClick={() => startTimer()}>
            Start
          </button>
          <button className="btn btn-warning" onClick={() => stopTimer()}>
            Stop
          </button>
          <button className="btn btn-danger" onClick={() => resetTimer()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
