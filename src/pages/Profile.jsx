import { useEffect, useRef } from "react"
import Textbox from "../components/basic/Textbox"
import ProfilePhoto from "../components/complex/ProfilePhoto"
import '../styles/Profile.css'
import useAuth from '../hooks/useAuth'
import { useState } from "react"
import Urls from "../Consts/Urls"
function Profile() {

    const textboxLabels = ["Name", "Surname", "Callname"]
    const { auth } = useAuth();
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
                    console.log(res)
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
    const textboxRefs = {};
    const textFields = textboxLabels.map(t => {
        const ref = useRef(null)
        textboxRefs[t] = ref
        return <Textbox label={t} key={t} inputRef={ref} />
    });
    return (
        <>
            <div className="container">
                <div className="profile-photo">
                    <ProfilePhoto></ProfilePhoto>
                </div>
                <div className="main-info">
                    {textFields}
                </div>
                <div className="buttons">
                    <div className="btn green">Save</div>
                    <div className="btn blue">Go to home</div>
                </div>
            </div>
        </>
    )
}
export default Profile