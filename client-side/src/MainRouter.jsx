import { useEffect } from "react";
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Register from './Pages/Auth/Register.jsx'
import Login from './Pages/Auth/Login.jsx'
import {ToastContainer} from 'react-toastify'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import Profile from './Pages/Profile.jsx'
import RedirectNotAuth from './Pages/RouteMiddleware/RedirectNotAuth.jsx'
import RedirectAuth from './Pages/RouteMiddleware/RedirectAuth.jsx'
import EditArticle from "./Pages/Profile/EditArticle.jsx";
import AllArticle from "./Pages/AllArticle.jsx";
import ArticleDetail from "./Pages/ArticleDetail.jsx";
const MainRouter = () => {
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <AuthContextProvider>
      <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/articles' element={<AllArticle />} />
            <Route path='/articles/:id' element={<ArticleDetail />} />
            <Route 
              path='/register' 
                element={
                  <RedirectAuth>
                      <Register />
                  </RedirectAuth>
                  
                  } />
            <Route 
              path='/login' 
                element={
                  <RedirectAuth>
                    <Login />
                  </RedirectAuth>
                   //<Login />
                  } />
            <Route 
                  path='/profile' 
                    element={
                      <RedirectNotAuth>
                          <Profile />
                      </RedirectNotAuth>        
                    } 
              />
            <Route 
                  path='/article/edit/:id' 
                    element={
                      <RedirectNotAuth>
                          <EditArticle />
                      </RedirectNotAuth>        
                    } 
              />
              
        </Routes>
      </AuthContextProvider> 
        <ToastContainer />
    </BrowserRouter>
  )
}

export default MainRouter