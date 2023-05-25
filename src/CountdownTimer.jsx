import React, { useState, useEffect } from "react";
import "./Countdown.css";

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [startCountdown, setStartCountdown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({ ...prevTime, [name]: parseInt(value, 10) }));
  };

  const handleStart = () => {
    setStartCountdown(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setStartCountdown(false);
    setIsPaused(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    let countdown;

    if (startCountdown && !isPaused) {
      countdown = setInterval(() => {
        setTime((prevTime) => {
          const { hours, minutes, seconds } = prevTime;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(countdown);
            return prevTime;
          }

          if (minutes === 0 && seconds === 0) {
            return { hours: hours - 1, minutes: 59, seconds: 59 };
          }

          if (seconds === 0) {
            return { hours, minutes: minutes - 1, seconds: 59 };
          }

          return { hours, minutes, seconds: seconds - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [startCountdown, isPaused]);

  const { hours, minutes, seconds } = time;

  return (
    <div className="countdown">
      <h1>React Timer</h1>
      <div className="countdown-time ">
        {`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </div>
      <div className="countdown-input">
        <div className="countdown-input-individual">
          <label>Hours:</label>
          <input
            type="number"
            name="hours"
            value={hours}
            onChange={handleChange}
          />
        </div>
        <div className="countdown-input-individual">
          <label>Minutes:</label>
          <input
            type="number"
            name="minutes"
            value={minutes}
            onChange={handleChange}
          />
        </div>
        <div className="countdown-input-individual">
          <label>Seconds:</label>
          <input
            type="number"
            name="seconds"
            value={seconds}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="countdown-buttons">
        {/* start button */}
        {!startCountdown && <button onClick={handleStart}>Start</button>}

        {/* paused button */}
        {startCountdown && !isPaused && (
          <button onClick={handlePause}>Pause</button>
        )}

        {/* resume button */}
        {startCountdown && isPaused && (
          <button onClick={handleStart}>Resume</button>
        )}

        {/* reset button */}
        {startCountdown && <button onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
};

export default CountdownTimer;
