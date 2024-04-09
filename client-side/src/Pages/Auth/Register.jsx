import Master from "../Layout/Master.jsx"

const Register = () => {
  return (
    <Master>
        <h5 className="text-white">Register</h5>
        <div className="form-group">
            <label htmlFor="">Enter Name</label>
            <input type="text" className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="">Enter Email</label>
            <input type="email" className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="">Enter Password</label>
            <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Register</button>
    </Master>
  )
}

export default Register