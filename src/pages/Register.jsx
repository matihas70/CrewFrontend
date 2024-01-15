import { useState } from "react";
import Textbox from "../components/basic/Textbox";
import '../styles/Register.css'
import Connector from "../services/Connector";

function Register() {
    const [nameVal, setNameVal] = useState("")
    const [surnameVal, setSurnameVal] = useState("")
    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const [repetePasswordVal, setRepetePasswordVal] = useState("")
    const register = (event) => {
        Connector.Register(nameVal, surnameVal, emailVal, passwordVal);
    }
    return (
        <div className="register-box">
            <Textbox label={'Name'} sendValue={setNameVal}></Textbox>
            <Textbox label={'Surname'} sendValue={setSurnameVal}></Textbox>
            <Textbox label={'Email'} sendValue={setEmailVal}></Textbox>
            <Textbox label={'Password'} sendValue={setPasswordVal}></Textbox>
            <Textbox label={'Repete Password'} sendValue={setRepetePasswordVal}></Textbox>
            <button className="btn save" onClick={register}>Register</button>
        </div>
    )
}
export default Register