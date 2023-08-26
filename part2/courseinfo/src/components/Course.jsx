
const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
  <div>
    <p>
      {props.part} {props.exercises}
    </p>
  </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p><b>Number of exercises {total}</b></p>
    </div>
  )
}

const Course = (props) => {
    return (
      <div>
        <Header courseName = {props.course.name}/>
        <Content parts = {props.course.parts}/>
        <Total parts = {props.course.parts}/>
      </div>
    )
}

export default Course