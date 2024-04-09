import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Register from './Pages/Auth/Register.jsx'
import Login from './Pages/Auth/Login.jsx'
import {ToastContainer} from 'react-toastify'
const MainRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
        
        <ToastContainer />
    </BrowserRouter>
  )
}

export default MainRouter