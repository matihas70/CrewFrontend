import { useRef, useState } from "react";
import '../../styles/ProfilePhoto.css'
import useAuth from "../../hooks/useAuth";
import Urls from "../../Consts/Urls";

function ProfilePhoto() {
    const [photoURL, setPhotoURL] = useState('')
    const [photoRatioClass, setPhotoRatioClass] = useState('')
    const { auth } = useAuth();
    const photoInputRef = useRef();
    const onUpload = (event) => {
        console.log(event.target.files[0]);
        const [file] = event.target.files

        if (file) {
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
            setUploaded(true)
        }
    }
    const discard = (e) => {
        setPhotoURL("");
        setUploaded(false);
    }
    const accept = async (e) => {
        const dataFile = new FormData();

        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            },
            body: photoInputRef.current.files[0]
        }
        let resData

        await fetch(Urls.Back + '/User/SaveProfilePhoto', options)
            .then(res => {
                console.log(res)
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