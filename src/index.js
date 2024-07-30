import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './App.css';

//axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL ='https://mern-todo-backend-tjps.onrender.com';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
