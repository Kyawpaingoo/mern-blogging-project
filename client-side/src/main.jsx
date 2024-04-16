import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRouter from './MainRouter.jsx'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:4444/api";
axios.defaults.withCredentials= true;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
)
