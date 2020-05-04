import React, {useState, useEffect, useRef} from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
    const STARTING_TIME = 5
    const inputRef = useRef(null)

    const [text, changeText] = useState("")
    const [words, changeWords] = useState(0)
    const [time, changeTime] = useState(STARTING_TIME)
    const [start, changeStart] = useState(false)

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
      changeStart(true)
      changeTime(STARTING_TIME)
      changeWords(0)
      changeText("")
      inputRef.current.disabled = false
      inputRef.current.focus()
    }

    function endGame() {
      changeStart(false)
      count(text)
    }

    useEffect(() => {
      if(start && time > 0) {
        const timer = setTimeout(() => {changeTime(time => time-1)},1000)
      } else {
        endGame()
      }
    },[time,start])
    
    return(
        <div>
            <h1>Test your typing speed!</h1>
            <textarea 
              ref = {inputRef} 
              value = {text} 
              onChange = {handleChange}
              disabled = {!start}
            />
            <h4>time remaining: {time}</h4>
            <button onClick = {startGame} disabled = {start}>Start Game!</button>
            <h1>Word Count: {words}</h1>
            <h1>Typing Speed: {60*words/STARTING_TIME} words per minute</h1>
        </div>
    )
}

export default App