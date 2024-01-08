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
                <div className="photos">
                    <div className="profile-photo">
                        <ProfilePhoto></ProfilePhoto>
                    </div>
                </div>

                <div className="main-info">
                    {textboxLabels.map(t => (<Textbox label={t} key={t} />))}
                </div>
            </div>
        </>
    )
}
export default Profile