import { useEffect, useRef } from "react"
import Textbox from "../../components/basic/Textbox"
import ProfilePhoto from "../../components/complex/ProfilePhoto"
import '../../styles/Profile.css'
import useAuth from '../../hooks/useAuth'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Urls from "../../Consts/Urls"
import Connector from "../../services/Connector"
import ExpandPanel from "../../components/complex/ExpandPanel"
import Addable from "../../components/complex/Addable"
import MainInfo from "./components/MainInfo"
import Education from "./components/EducationInfo"
function Profile() {

    const textboxLabels = ["Name", "Surname", "Callname"]
    const { auth } = useAuth();
    const navigate = useNavigate();

    const TextboxRefs = {
        name: useRef(null),
        surname: useRef(null),
        callname: useRef(null),
    }

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
                            <div className="info main-info">
                                <MainInfo />
                            </div>
                            <div className="info education">
                                <Education />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Profile