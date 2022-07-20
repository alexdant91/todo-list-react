import { useEffect, useState } from 'react';

import axios from 'axios';

import './App.css';

import TableComponent from './TableComponent';
import MessageComponent from './MessageComponent';
import ErrorComponent from './ErrorComponent';

const API_URL = "https://jsonplaceholder.typicode.com/todos";

let _errorTimer = null;
let _messageTimer = null;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: API_URL,
      });

      setTodos(response.data);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setError(err.message);
    }
  }

  const handleRemoveTodo = (id) => {
    if (window.confirm("Vuoi eliminare?")) {
      const _todos = [...todos];

      const index = _todos.findIndex(todo => todo.id === id);

      if (index !== -1) {
        _todos.splice(index, 1);

        setTodos(_todos);
        setMessage(`Hai eliminato la riga con id: ${id}`);
      }
    }
  }

  const handleUpdateTodo = (id) => {
    const _todos = [...todos];

    const index = _todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      _todos[index].completed = !_todos[index].completed;

      setTodos(_todos);
      setMessage(`Hai modificato la riga con id: ${id}`);
    }
  }

  const handleCloseMessage = () => {
    clearTimeout(_messageTimer);
    setMessage(null);
  }

  const handleCloseError = () => {
    clearTimeout(_errorTimer);
    setError(null);
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  useEffect(() => {
    if (message !== null) {
      clearTimeout(_messageTimer);
      _messageTimer = setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }, [message])

  useEffect(() => {
    if (error !== null) {
      clearTimeout(_errorTimer);
      _errorTimer = setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }, [error])

  return (
    <div className="App">
      <ErrorComponent
        error={error}
        handleCloseError={handleCloseError}
      />
      <MessageComponent
        message={message}
        handleCloseMessage={handleCloseMessage}
      />
      <TableComponent
        isLoaded={isLoaded}
        todos={todos}
        handleRemoveTodo={handleRemoveTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    </div>
  );
}

export default App;
