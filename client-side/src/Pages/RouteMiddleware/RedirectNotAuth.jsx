import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { Navigate } from 'react-router';

const RedirectNotAuth = ({children}) => {
    const {authUser} = useContext(AuthContext);
    
    if(authUser == false){
        return <Navigate to={"/login"} />
    }

    return children;
}

export default RedirectNotAuth