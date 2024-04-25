import { useState, useContext } from "react"
import Master from "../Layout/Master.jsx"
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext.jsx";

const Register = () => {
  const navigate = useNavigate();
  const {setAuthUser} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const register = async ()=>{
    await axios.post('/register', {name, email, password}).then(d =>{
      console.log(d.data);

      const {data, message} = d.data
      switch (message){
        case 'success':
          setAuthUser(data);
          toast.success('Successfully Registered!');
          navigate('/login');
          break;
        case 'validate_error':
          data.map((message)=>{
            toast.error(message.message);
          })
          return;
        default:
          toast.error(message);
          break;
      }
    });
  }
  return (
    <Master>
        <h5 className="text-white">Register</h5>
        <div className="form-group">
            <label htmlFor="">Enter Name</label>
            <input value={name} type="text" className="form-control" onChange={e=>setName(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="">Enter Email</label>
            <input value={email} type="email" className="form-control" onChange={e=>setEmail(e.target.value)}  />
        </div>
        <div className="form-group">
            <label htmlFor="">Enter Password</label>
            <input value={password} type="password" className="form-control" onChange={e=>setPassword(e.target.value)} />
        </div>
        <button onClick={register} className="btn btn-primary">Register</button>
    </Master>
  )
}

export default Register