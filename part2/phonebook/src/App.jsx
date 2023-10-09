import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const PersonName = ({ persons,deletePerson }) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>)}
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

const Notification = ({ message, notificationStyle }) => {
  const successNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  if (notificationStyle === 'success') {
    return (
      <div style={successNotificationStyle}>
        {message}
      </div>
    )
  } else if (notificationStyle === 'error') {
    return (
      <div style={errorNotificationStyle}>
        {message}
      </div>
  )
  }
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setnotificationMessage] = useState(null)
  const [notificationStyle, setnotificationStyle] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const submitName = (event) => {
    event.preventDefault()
    const nameExist = persons.find(person => person.name === newName)
    if (nameExist) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const newPerson = {
        name: newName,
        number: newNumber
      }
      if (confirmUpdate) {
        console.log(nameExist)
        personService.updatePerson(nameExist.id, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== nameExist.id ? person : response.data))
          setnotificationMessage(`Updated ${newName}`)
          setnotificationStyle('success')
        })
        .catch(error => {
          setnotificationMessage(`Information of ${newName} has already been removed from server`)
          setnotificationStyle('error')
        })
      }
    } else { 
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson).then(response => {
        setPersons(persons.concat(response.data))
        setnotificationMessage(`Added ${newName}`)
        setnotificationStyle('success')
      })
    }
  }

  const deletePerson = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)
    if (confirmDelete) {
      personService.deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      setnotificationMessage(`Deleted ${person.name}`)
      setnotificationStyle('success')
    }
  }

  const filter = (event) => {
    const filterName = event.target.value
    const filterPerson = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    setPersons(filterPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notificationStyle = {notificationStyle}/>
      <Filter filter={filter} />
      <h2>Add a new</h2>
      <Form submitName={submitName} addName={addName} addNumber={addNumber} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonName persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App