import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRouter from './MainRouter.jsx'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
)
