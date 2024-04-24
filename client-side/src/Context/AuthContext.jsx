import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const [authUser, setAuthUser] = useState(false);
    
    useEffect(()=>{
        axios.get('/checkAuth').then(({data})=>{
            if(data == 'not_auth'){
                setAuthUser(false);
                return;
            }
            if(data){
                setAuthUser(data);
                // console.log(authUser);
            }
        },[])
    })
    return(
        <AuthContext.Provider value={{ authUser, setAuthUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;