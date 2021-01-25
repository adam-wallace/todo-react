
import React, { useState, useEffect } from "react"
import './App.css';
// Import components
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  // [actual value, a function to change the actual value]
  // State
  const [inputText, setInputTest] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  // run once
  useEffect(() => {
    getLocalTodos()
  }, [])

  // Use effect
  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  // Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false))
      default:
        setFilteredTodos(todos)
        break
    }
  }

  // save to local browser storage
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Adams to do list</h1>
      </header>
      <Form setInputText={setInputTest} todos={todos} setTodos={setTodos} inputText={inputText} setStatus={setStatus} />
      <TodoList todos={todos} filteredTodos={filteredTodos} setTodos={setTodos} />
    </div >
  )
}

export default App
