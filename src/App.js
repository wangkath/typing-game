import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [text, changeText] = useState("");
    
    return(
        <div>
            <h1>Test your typing speed!</h1>
            <textarea 
              value = {text} 
              onChange = {(event) => changeText(event.target.value)}
            />
            <h4>time remaining: </h4>
            <button>Start Game!</button>
            <h1>Word Count: </h1>
            <h1>{text}</h1>
        </div>
    )
}

export default App