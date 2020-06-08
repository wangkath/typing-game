import {useState,useEffect,useRef} from "react"

function useWordGame() {
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

    return {inputRef,startingTime,text,words,time,start,WPM,handleChange,startGame,updateTime}
}

export default useWordGame