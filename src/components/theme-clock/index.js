import { useState, useEffect } from "react"
import "./style/index.css"

function ThemeClock() {
  const [mode, setMode] = useState("light")
  const [date, setDate] = useState(new Date())

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  useEffect(() => {
    if (mode === "light") {
      document.querySelector("html").classList.remove("dark")
    } else {
      document.querySelector("html").classList.add("dark")
    }
  }, [mode])

  useEffect(() => {
    const interval = setInterval(setTime, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [date])

  const setTime = () => {
    setDate(new Date())
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
    } else {
      setMode("light")
    }
  }

  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  const hourNeedleStyle = {
    transform: `translate(-50%, -100%) rotate(${scale(
      date.getHours() % 12,
      0,
      11,
      0,
      360
    )}deg)`,
  }
  const minuteNeedleStyle = {
    transform: `translate(-50%, -100%) rotate(${scale(
      date.getMinutes(),
      0,
      59,
      0,
      360
    )}deg)`,
  }
  const secondNeedleStyle = {
    transform: `translate(-50%, -100%) rotate(${scale(
      date.getSeconds(),
      0,
      59,
      0,
      360
    )}deg)`,
  }

  return (
    <div className="theme-clock">
      <button className="toggle" onClick={toggleMode}>
        {mode === "light" ? "Dark mode" : "Light mode"}
      </button>

      <div className="clock-container">
        <div className="clock">
          <div className="needle hour" style={hourNeedleStyle}></div>
          <div className="needle minute" style={minuteNeedleStyle}></div>
          <div className="needle second" style={secondNeedleStyle}></div>
          <div className="center-point"></div>
        </div>
        <div className="time">
          {date.getHours()}:{date.getMinutes()}
        </div>
        <div className="date">
          {days[date.getDay()]}, {months[date.getMonth()]}{" "}
          <span className="circle">{date.getDate()}</span>
        </div>
      </div>
    </div>
  )
}

export default ThemeClock
