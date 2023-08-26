import { useState } from 'react'

const PersonName = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const Filter = ({ filter }) => {
  return (
    <div>
      filter shown with <input onChange={filter} />
    </div>
  )
}

const Form = ({ submitName, addName, addNumber, newName, newNumber }) => {
  return (
    <form onSubmit={submitName}>
        <div>
          name: <input onChange={addName}/>
        </div>
        <div>
          number: <input onChange = {addNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const submitName = (event) => {
    event.preventDefault()
    //Prevent the user from being able to add names that already exist in the phonebook
    const nameExist = persons.find(person => person.name === newName)
    if (nameExist) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filter = (event) => {
    const filterName = event.target.value
    const filterPerson = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    setPersons(filterPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} />
      <h2>Add a new</h2>
      <Form submitName={submitName} addName={addName} addNumber={addNumber} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonName persons={persons} />
    </div>
  )
}

export default App