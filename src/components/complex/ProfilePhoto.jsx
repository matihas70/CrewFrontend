import { useState } from "react";

function ProfilePhoto() {
    const [photoURL, setPhotoURL] = useState('')
    const [photoRatioClass, setPhotoRatioClass] = useState('')
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
        }
    }
    return (
        <>
            <div className={"photo " + photoRatioClass}>
                {photoURL && <img src={photoURL}></img>}
            </div>
            <label htmlFor="photo-upload">
                <p>Change photo</p>
            </label>
            <input id="photo-upload" type="file" onChange={onUpload} accept="image/png, image/jpeg, image/jpg" />
        </>
    )
}
export default ProfilePhoto