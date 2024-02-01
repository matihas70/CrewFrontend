import { useEffect, useRef } from "react"
import Textbox from "../components/basic/Textbox"
import ProfilePhoto from "../components/complex/ProfilePhoto"
import '../styles/Profile.css'
import useAuth from '../hooks/useAuth'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Urls from "../Consts/Urls"
import Connector from "../services/Connector"
function Profile() {

    const textboxLabels = ["Name", "Surname", "Callname"]
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: "",
        surname: "",
        callname: ""
    });
    const TextboxRefs = {
        name: useRef(null),
        surname: useRef(null),
        callname: useRef(null),
    }
    useEffect(() => {
        async function getData() {
            let resData
            await Connector.GetRequest(auth.token, Urls.Back + '/User')
                .then(res => {
                    return res.json()
                }).then(data => {
                    resData = data
                });
            setProfileData(resData)
            TextboxRefs.name.current.value = resData['name']
            TextboxRefs.surname.current.value = resData['surname']
            TextboxRefs.callname.current.value = resData['callname']
            // textboxRefs["Name"].current.value = resData["name"]
            // textboxRefs["Surname"].current.value = resData["surname"]
            // textboxRefs["Callname"].current.value = resData["callname"]
        }
        getData()
    }, [])
    const SaveData = async (e) => {
        let body = {
            Name: TextboxRefs.name.current.value,
            Surname: TextboxRefs.surname.current.value,
            Callname: TextboxRefs.callname.current.value
        }
        await Connector.PatchRequest(auth.token, Urls.Back + '/User', body)
            .then(res => {
                if (res.ok) {

                }
            })

    }
    function onchange(name, value) {
        console.log(value)
        setProfileData({ ...profileData, [name]: value })
        //setProfileData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <div className="container">
                <div className="content">
                    <div className="inner">
                        <div className="left">
                            <div className="profile-photo">
                                <ProfilePhoto></ProfilePhoto>
                            </div>
                        </div>
                        <div className="right">
                            <div className="main-info">
                                <Textbox label={"Name"} id={"name"} reference={TextboxRefs.name} />
                                <Textbox label={"Surname"} id={"surname"} reference={TextboxRefs.surname} />
                                <Textbox label={"Callname"} id={"callname"} reference={TextboxRefs.callname} />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="btn blue" onClick={() => { navigate('/') }}>Go to home</button>
                        <button className="btn green" onClick={SaveData}>Save</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Profile