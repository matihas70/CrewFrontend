import { useRef } from "react"
import Textbox from "../components/basic/Textbox"
import ProfilePhoto from "../components/complex/ProfilePhoto"
import '../styles/Profile.css'
import { useState } from "react"
function Profile() {

    const textboxLabels = ["Name", "Surname", "Callname",]

    return (
        <>
            <div className="container">
                <div className="profile-photo">
                    <ProfilePhoto></ProfilePhoto>
                </div>
                <div className="main-info">
                    {textboxLabels.map(t => (<Textbox label={t} key={t} />))}
                </div>
                <div className="buttons">
                    <div className="btn save">Save</div>
                </div>
            </div>
        </>
    )
}
export default Profile