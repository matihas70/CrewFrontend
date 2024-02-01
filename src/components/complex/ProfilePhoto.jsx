import { useEffect, useRef, useState } from "react";
import '../../styles/ProfilePhoto.css'
import useAuth from "../../hooks/useAuth";
import Urls from "../../Consts/Urls";
import Connector from "../../services/Connector";

function ProfilePhoto() {
    const [photoURL, setPhotoURL] = useState('')
    const [photoRatioClass, setPhotoRatioClass] = useState('')
    const { auth } = useAuth();
    const photoInputRef = useRef();
    useEffect(() => {
        async function GetProfilePicture() {
            const file = await Connector.GetRequest(auth.token, Urls.Back + "/User/ProfilePicture")
                .then(res => res.blob())
            adjustAndSetPhoto(file);
        }
        //if (!photoURL)
        GetProfilePicture();
    }, [])
    function adjustAndSetPhoto(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image()
            image.src = e.target.result
            image.onload = () => {
                if (image.naturalWidth > image.naturalHeight) {
                    setPhotoRatioClass("more-width")
                }
                else if (image.naturalHeight > image.naturalWidth) {
                    setPhotoRatioClass("more-height")
                }
            }
        }
        reader.readAsDataURL(file);
        setPhotoURL(URL.createObjectURL(file));
    }
    const onUpload = (event) => {
        const [file] = event.target.files

        if (file) {
            adjustAndSetPhoto(file);
            setUploaded(true);
        }
    }
    const discard = (e) => {
        setPhotoURL("");
        setUploaded(false);
    }
    const accept = async (e) => {

        await Connector.PatchRequest(auth.token, Urls.Back + '/User/SaveProfilePhoto', photoInputRef.current.files[0])
            .then(res => {
                if (res.ok)
                    setUploaded(false);
            })
    }
    const [uploaded, setUploaded] = useState(false);
    const optionsButtons = (<div className="chose-buttons">
        <button className="btn red" onClick={discard}>Discard</button>
        <button className="btn green" onClick={accept}>Accept</button>
    </div>)

    return (
        <>
            <div className={"photo " + photoRatioClass}>
                {photoURL && <img src={photoURL}></img>}
            </div>
            {uploaded ? optionsButtons : <label htmlFor="photo-upload">
                <p className="btn gray">Change photo</p>
            </label>}
            <input id="photo-upload" ref={photoInputRef} type="file" onChange={onUpload} accept="image/png, image/jpeg, image/jpg" />
        </>
    )
}
export default ProfilePhoto