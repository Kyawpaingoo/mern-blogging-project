import { BrowserRouter, Link, Route, Routes, } from 'react-router-dom'
import App from './App.jsx'

const MainRouter = () => {
  return (
    <BrowserRouter>
        <div>
            <Link to={'/'}>Home</Link>
        </div>
        <Routes>
            <Route path='/' element={<App />} />
        </Routes>
    </BrowserRouter>
  )
}

export default MainRouter