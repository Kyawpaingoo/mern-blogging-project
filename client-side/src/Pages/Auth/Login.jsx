import Master from "../Layout/Master.jsx"
import {toast} from 'react-toastify'

toast.success('Hello');
const Login = () => {

  return (
    <Master>
        <h5 className="text-white">Login</h5>
        <div className="form-group">
            <label htmlFor="">Enter Email</label>
            <input type="email" className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="">Enter Password</label>
            <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Login</button>
    </Master>
  )
}

export default Login