import React, {useState, useEffect} from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
    const [text, changeText] = useState("")
    const [words, changeWords] = useState(0)
    const [time, changeTime] = useState(5)
    const [start, changeStart] = useState(false)

    function handleChange(event) {
      const {value} = event.target
      changeText(value)
      count(value)

    }

    function count(string) {
      for(var i = 0; i < string.length; i++) {
        if(string.charAt(i) === " ") {
          changeWords(string.trim().split(" ").length)
        }
      }
    }

    useEffect(() => {
      if(start) {
        const timer = setTimeout(() => {changeTime(time => time-1)},1000)
        if(time === 0) {
          clearTimeout(timer)
          changeStart(false)
        }
      }
    },[time,start])
    
    return(
        <div>
            <h1>Test your typing speed!</h1>
            <textarea 
              value = {text} 
              onChange = {handleChange}
            />
            <h4>time remaining: {time}</h4>
            <button onClick = {() => changeStart(true)}>Start Game!</button>
            <h1>start: {start ? "true":"false"}</h1>
            <h1>Word Count: {words}</h1>
            <h1>{text}</h1>
        </div>
    )
}

export default App