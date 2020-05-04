import React, {useState, useEffect, useRef} from 'react'
import './App.css'

function App() {
    const inputRef = useRef(null)

    const [startingTime, setStartingTime] = useState(null)
    const [text, changeText] = useState("")
    const [words, changeWords] = useState(0)
    const [time, changeTime] = useState(startingTime)
    const [start, changeStart] = useState(false)
    const [WPM, changeWPM] = useState(0)

    function handleChange(event) {
      const {value} = event.target
      changeText(value)
    }

    function count(string) {
      for(var i = 0; i < string.length; i++) {
        if(string.charAt(i) === " ") {
          changeWords(string.trim().split(" ").length)
        }
      }
    }

    function startGame() {
      if(startingTime > 0) {
        changeTime(startingTime)
        changeStart(true)
        changeWords(0)
        changeText("")
        inputRef.current.disabled = false
        inputRef.current.focus()
      } else {
        alert('select a time')
      }
    }

    function endGame() {
      changeStart(false)
      count(text)
      changeWPM(60*words/startingTime)
    }

    function updateTime(e) {
      const {value} = e.target
      setStartingTime(value)
      changeTime(value)
    }

    useEffect(() => {
      if(start && time > 0) {
        const timer = setTimeout(() => {changeTime(time => time-1)},1000)
      } else if(time === 0) {
        endGame()
      }
    },[time,start])
    
    return(
        <div>
            <h1>Test your typing speed! Choose time and press start to begin:)</h1>
            <select disabled = {start} value = {startingTime} onChange = {updateTime}>
              <option value = "">select time</option>
              <option value = {5}>5 seconds</option>
              <option value = {10}>10 seconds</option>
              <option value = {30}>30 seconds</option>
              <option value = {60}>1 minute</option>
              <option value = {120}>2 minutes</option>
            </select>
            <h5>selected time: {startingTime > 0 ? `${startingTime} seconds`: "please select a time"}</h5>
            <h4 className = "box">time remaining: {startingTime > 0 ? `${time} seconds`: "please select a time"}</h4>
            <textarea 
              ref = {inputRef} 
              value = {text} 
              onChange = {handleChange}
              disabled = {!start}
            />
            <button onClick = {startGame} disabled = {start}>Start Game!</button>
            <h1>Word Count: {words}</h1>
            <h1>Typing Speed: {WPM} words per minute</h1>
        </div>
    )
}

export default App