import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import useWordGame from "./useWordGame"

function App() {
  const {inputRef,startingTime,text,words,time,start,WPM,handleChange,startGame,updateTime} = useWordGame()
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