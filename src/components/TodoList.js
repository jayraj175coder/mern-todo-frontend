import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';
import '../App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
    } catch (err) {
      setError('Network Error: Unable to fetch todos');
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('/todos', { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      setError('Network Error: Unable to add todo');
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = todos.find(todo => todo._id === id);
      await axios.put(`/todos/${id}`, { ...todo, completed: !todo.completed });
      fetchTodos();
    } catch (err) {
      setError('Network Error: Unable to complete todo');
    }
  };

  const editTodo = async (id, newText) => {
    try {
      await axios.put(`/todos/${id}`, { text: newText });
      fetchTodos();
    } catch (err) {
      setError('Network Error: Unable to edit todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Network Error: Unable to delete todo');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Todo List</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="btn btn-primary" onClick={addTodo}>
          <i className="fa fa-plus"></i> Add
        </button>
      </div>
      <div className="list-group">
        {todos.map(todo => (
          <Todo
            key={todo._id}
            todo={todo}
            onComplete={completeTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
