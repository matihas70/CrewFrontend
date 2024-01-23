import { useContext, useState } from "react"
import Textbox from "../components/basic/Textbox"
import "../styles/Login.css"
import Connector from "../services/Connector";
import AuthContext from "../contexts/AuthProvider";
import useAuth from "../hooks/useAuth";
function Login() {
    const { SetAuthenticated } = useAuth()
    const [loginVal, setLoginVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

    const login = async (event) => {
        const token = await Connector.Login(loginVal, passwordVal)
        if (token) {
            SetAuthenticated({ email: loginVal, token });
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