import Master from "../Layout/Master.jsx"
import {toast} from 'react-toastify'
import axios from 'axios'
import { useContext, useState } from "react";
import ButtonLoader from "../../Components/ButtonLoader..jsx";
import { useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext.jsx";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const {setAuthUser} = useContext(AuthContext);

  const login = ()=>{
    setLoader(true);
    axios.post('/login', {email, password}).then(({data})=>{
      setLoader(false);
      if(data.message == 'email not found'){
        return toast.error('Email Not Found');
      }

      if(data.message == 'wrong password') {
        return toast.error('Wrong Passwword');
      }

      setAuthUser(data.data);
      toast.success(`Welcome ${data.data.name}!`);
      navigate('/');
    })
  }
  return (
    <Master>
        <h5 className="text-white">Login</h5>
        <div className="form-group">
            <label htmlFor="">Enter Email</label>
            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="">Enter Password</label>
            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={login} disabled={loader}>
          {loader && <ButtonLoader /> }
          Login
        </button>
        
    </Master>
  )
}

export default Login