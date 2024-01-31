import { useEffect, useRef } from "react"
import Textbox from "../components/basic/Textbox"
import ProfilePhoto from "../components/complex/ProfilePhoto"
import '../styles/Profile.css'
import useAuth from '../hooks/useAuth'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Urls from "../Consts/Urls"
function Profile() {

    const textboxLabels = ["Name", "Surname", "Callname"]
    const { auth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        async function getData() {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                },
            }
            let resData
            await fetch(Urls.Back + '/User', options)
                .then(res => {
                    return res.json()
                }).then(data => {
                    resData = data
                });
            textboxRefs["Name"].current.value = resData["name"]
            textboxRefs["Surname"].current.value = resData["surname"]
            textboxRefs["Callname"].current.value = resData["callname"]
        }
        getData()
    }, [])

    const [photoUrl, setPhotoURL] = useState('');
    const textboxRefs = {};
    const textFields = textboxLabels.map(t => {
        const ref = useRef(null)
        textboxRefs[t] = ref
        return <Textbox label={t} key={t} inputRef={ref} />
    });
    return (
        <>
            <div className="container">
                <div className="content">
                    <div className="inner">
                        <div className="left">
                            <div className="profile-photo">
                                <ProfilePhoto sendPhotoUrl={setPhotoURL}></ProfilePhoto>
                            </div>
                        </div>
                        <div className="right">
                            <div className="main-info">
                                {textFields}
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="btn blue" onClick={() => { navigate('/') }}>Go to home</button>
                        <button className="btn green" >Save</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Profile