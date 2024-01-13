import { useState } from "react"
import Textbox from "../components/basic/Textbox"
import "../styles/Login.css"
function Login() {
    const [loginVal, setLoginVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

    const login = (event) => {
        console.log(loginVal, passwordVal)
    }

    return (
        <div className="login-box">
            <Textbox label="login" sendValue={setLoginVal}></Textbox>
            <Textbox label="password" sendValue={setPasswordVal}></Textbox>
            <button onClick={login}>Login</button>
        </div>
    )
}
export default Login