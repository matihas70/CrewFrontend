import ExpandPanel from "../../../components/complex/ExpandPanel"
import Textbox from "../../../components/basic/Textbox"
import { useEffect, useRef } from "react"
import Connector from "../../../services/Connector"
import useAuth from "../../../hooks/useAuth"
import Urls from "../../../Consts/Urls"
import "../../../styles/MainInfo.css"
function MainInfo() {
    const { auth } = useAuth();
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
            TextboxRefs.name.current.value = resData['name']
            TextboxRefs.surname.current.value = resData['surname']
            TextboxRefs.callname.current.value = resData['callname']
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
    return (
        <ExpandPanel title={"Main informations"} iconPath={"icons/main-info-icon.svg"}>
            <div className="main-info-inner">
                <Textbox label={"Name"} id={"name"} reference={TextboxRefs.name} />
                <Textbox label={"Surname"} id={"surname"} reference={TextboxRefs.surname} />
                <Textbox label={"Callname"} id={"callname"} reference={TextboxRefs.callname} />
                <div className="buttons-info">
                    <button className="btn green" onClick={SaveData}>Save</button>
                </div>
            </div>
        </ExpandPanel>
    )
}
export default MainInfo