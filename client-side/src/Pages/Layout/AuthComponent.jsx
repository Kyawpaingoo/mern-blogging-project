import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../Context/AuthContext"

const AuthComponent = () => {
    const {authUser, setAuthUser} = useContext(AuthContext)
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
                <Link to="/login" className="btn btn-primary">
                    Profile
                </Link>
                <Link to="/register" className="btn btn-primary">
                    Logout
                </Link>
            </>
            )
        }
        
    </div>
  )
}

export default AuthComponent