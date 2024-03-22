import { useRef, useState } from "react";
import Textbox from "../components/basic/Textbox";
import '../styles/Register.css'
import Connector from "../services/Connector";

function Register() {
    const [nameVal, setNameVal] = useState("")
    const [surnameVal, setSurnameVal] = useState("")
    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const [repetePasswordVal, setRepetePasswordVal] = useState("")

    const refs = {
        name: useRef(null),
        surname: useRef(null),
        email: useRef(null),
        password: useRef(null),
        repeatePassword: useRef(null)
    }
    const register = (event) => {
        const name = refs.name.current.value
        const surname = refs.surname.current.value
        const email = refs.email.current.value
        const password = refs.password.current.value
        const repeatPassword = refs.repeatePassword.current.value
        Connector.Register(name, surname, email, password);
    }
    return (
        <div className="register-box">
            <Textbox label={'Name'} reference={refs.name}></Textbox>
            <Textbox label={'Surname'} reference={refs.surname}></Textbox>
            <Textbox label={'Email'} reference={refs.email}></Textbox>
            <Textbox label={'Password'} reference={refs.password}></Textbox>
            <Textbox label={'Repete Password'} reference={refs.repeatePassword}></Textbox>
            <button className="btn save" onClick={register}>Register</button>
        </div>
    )
}
export default Register