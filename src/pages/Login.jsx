import { useContext, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import Textbox from "../components/basic/Textbox"
import "../styles/Login.css"
import Connector from "../services/Connector";
import AuthContext from "../contexts/AuthProvider";
import useAuth from "../hooks/useAuth";
function Login() {
    const { setAuth } = useAuth()
    const [loginVal, setLoginVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const login = async (event) => {
        const token = await Connector.Login(loginVal, passwordVal)
        if (token) {
            setAuth({ email: loginVal, token });
            navigate(from, { replace: true });
        }
    }

    return (
        <div className="login-box">
            <div className="header">
                <h2>Login</h2>
            </div>
            <div className="login-form">
                <Textbox label="email" sendValue={setLoginVal}></Textbox>
                <Textbox label="password" sendValue={setPasswordVal}></Textbox>
            </div>
            <div className="button">
                <button className="btn blue login-btn" onClick={login}>Sign in</button>
            </div>
        </div>
    )
}
export default Login