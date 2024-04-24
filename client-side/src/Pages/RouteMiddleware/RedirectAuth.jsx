import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { Navigate } from 'react-router';

const RedirectAuth = ({children}) => {
    const {authUser} = useContext(AuthContext);
   
    if(authUser != false){
        return <Navigate to={"/profile"} />
    }

    return children;
}

export default RedirectAuth