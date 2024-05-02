import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../Context/AuthContext"
import axios from "axios"

const AuthComponent = () => {
    const {authUser, setAuthUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const logout = ()=>{
        axios.post('/logout').then((d)=>{
            if(d.data=='success'){
                setAuthUser(false);
                navigate('/login');
            }
        })
    }
  return (
    <div className="bg-card p-3">
        
        {!authUser && (
            <>
            <Link to="/login" className="btn btn-primary">
                Login
            </Link>
            <Link to="/register" className="btn btn-primary">
                Register
            </Link>
            </>   
        )}

        { authUser && (
            <>
                <Link to="/profile" className="btn btn-primary">
                    {authUser.name}
                </Link>
                <button onClick={logout} className="btn btn-primary">
                    Logout
                </button>
            </>
            )
        }
        
    </div>
  )
}

export default AuthComponent