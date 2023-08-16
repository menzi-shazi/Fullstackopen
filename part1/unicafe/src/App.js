import { useState } from 'react'

const Button = ({goodButtonClick,neutralButtonClick,badButtonClick}) => {
  return (
    <div>
      <button onClick = {goodButtonClick}>good</button>
      <button onClick = {neutralButtonClick}>neutral</button>
      <button onClick = {badButtonClick}>bad</button>
    </div>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <tbody>
      <tr>
        <th>{text}</th>
        <th>{value}</th>
      </tr>
    </tbody>
  )
}

const Statistics = ({good,neutral,bad,total,average,positive}) => {
  if (good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <div>
        <table>
          <StatisticLine text = "good" value = {good}/>
          <StatisticLine text = "neutral" value = {neutral}/>
          <StatisticLine text = "bad" value = {bad}/>
          <StatisticLine text = "all" value = {total}/>
          <StatisticLine text = "average" value = {average}/>
          <StatisticLine text = "positive" value = {`${positive*100}%`}/>
        </table>
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
      <Button goodButtonClick={goodButtonClick} badButtonClick={badButtonClick} neutralButtonClick={neutralButtonClick}/>
      <h1>Statistics</h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral} average = {average} positive = {positive} total = {total}/>
    </div>
  )
}

export default App