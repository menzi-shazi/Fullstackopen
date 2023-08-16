import { useState } from 'react'

const Statistics = ({good,neutral,bad,total,average,positive}) => {
  if (good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {total}</div>
        <div>average {average}</div>
        <div>positive {positive*100}</div>
    </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average,setAverage] = useState(0)
  const [positive,setPositive] = useState(0)
  const [total,setTotal] = useState(0)

  const goodButtonClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    const updatedGood = good + 1
    const updatedTotal = total + 1
    const avg = (updatedGood + bad * -1)/updatedTotal
    setAverage(avg)
    setPositive(updatedGood/updatedTotal)
  }

  const neutralButtonClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    const updatedTotal = total + 1
    const avg = (good + bad * -1)/updatedTotal
    setAverage(avg)
    setPositive(good/updatedTotal)
  }

  const badButtonClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    const avg = (good + updatedBad * -1)/updatedTotal
    setAverage(avg)
    setPositive(good/updatedTotal)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick = {goodButtonClick}>good</button>
      <button onClick = {neutralButtonClick}>neutral</button>
      <button onClick = {badButtonClick}>bad</button>
      <h1>Statistics</h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral} average = {average} positive = {positive} total = {total}/>
    </div>
  )
}

export default App