import ExpandPanel from "../../../components/complex/ExpandPanel"
import Textbox from "../../../components/basic/Textbox"
import Addable from "../../../components/complex/Addable"
import Datebox from "../../../components/basic/Datebox"
import "../../../styles/EducationInfo.css"
import { useEffect, useRef, useState, createRef } from "react"
import Connector from "../../../services/Connector"
import useAuth from "../../../hooks/useAuth"
import Urls from "../../../Consts/Urls"
import Selectbox from "../../../components/basic/Selectbox"
function EducationInfo() {
    const { auth } = useAuth();
    const [controls, setControls] = useState([]);
    let selectboxOptions;
    //const [selectboxOptions, setSelectboxOptions] = useState(null)
    useEffect(() => {
        Connector.GetRequest(auth.token, Urls.Back + '/User/Education')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(data => {
                console.log(data)
                selectboxOptions = data.educationTypes
                for (let d of data.dto) {
                    loadControlsWithData(d)
                }
            })
    }, [])
    const save = async (e) => {
        let reqBody = []
        for (let control of controls) {
            let reqObject = {}
            for (let refName in control.refs) {
                reqObject[refName] = control.refs[refName].current.value
            }
            reqObject.id = reqObject.id || 0
            reqBody.push(reqObject)
        }

        await Connector.PutRequest(auth.token, Urls.Back + '/User/Education', reqBody)
            .then(res => console.log(res))
    }

    const loadControlsWithData = (data) => {
        //const controlsAndRefs = createNewControls();
        const refs = {
            id: createRef(),
            schoolName: createRef(),
            schoolType: createRef(),
            dateFrom: createRef(),
            dateTo: createRef(),
            field: createRef(),
            degree: createRef()
        }
        const controlsDOM = (<>
            <div className="action remove" onClick={(e) => removeControls(e, refs.id)}>
                <img className="action-img" src="icons/remove.svg" alt="" />
            </div>
            <input type="text" name="id" hidden ref={refs.id} defaultValue={data.id} />
            <Textbox label={"School name"} reference={refs.schoolName} initValue={data.schoolName} />
            <Selectbox label={"Type"} reference={refs.schoolType} initValue={data.schoolType} options={selectboxOptions} />
            <div className="education-dates">
                <Datebox label={"from"} reference={refs.dateFrom} initValue={data.dateFrom} />
                <Datebox label={"to"} reference={refs.dateTo} initValue={data.dateTo} />
            </div>
            <Textbox label={"Field of study"} reference={refs.field} initValue={data.field} />
            <Textbox label={"Degree"} reference={refs.degree} initValue={data.degree} />
        </>)

        setControls(prev => [...prev, { controlsDOM, refs }])
    }
    const addControls = () => {
        const refs = {
            id: createRef(),
            schoolName: createRef(),
            schoolType: createRef(),
            dateFrom: createRef(),
            dateTo: createRef(),
            field: createRef(),
            degree: createRef()
        }
        const controlsDOM = (<>
            <div className="action remove" onClick={(e) => removeControls(e, refs.id)}>
                <img className="action-img" src="icons/remove.svg" alt="" />
            </div>
            <input type="text" name="id" hidden ref={refs.id} />
            <Textbox label={"School name"} reference={refs.schoolName} />
            <Selectbox label={"Type"} reference={refs.schoolType} options={selectboxOptions} />
            <div className="education-dates">
                <Datebox label={"from"} reference={refs.dateFrom} />
                <Datebox label={"to"} reference={refs.dateTo} />
            </div>
            <Textbox label={"Field of study"} reference={refs.field} />
            <Textbox label={"Degree"} reference={refs.degree} />
        </>)
        setControls(prev => [...prev, { controlsDOM, refs }])
    }
    const removeControls = async (e, idRef) => {
        console.log(e, idRef)
        const id = idRef.current.value
        if (id) {
            await Connector.DeleteRequest(auth.token, Urls.Back + `/User/Education/${id}`)
                .then(res => console.log(res))
        }
        e.target.parentElement.parentElement.remove();
    }
    return (
        <ExpandPanel title={"Education"} iconPath={"icons/education-icon.svg"}>
            <div>
                <div className="addable-content">
                    {controls.map((c, i) => <div className="education-controls" key={i}>{c.controlsDOM}</div>)}
                </div>
                <div className="action add" onClick={addControls}>
                    <img className="action-img" src="icons/add.svg" alt="" />
                </div>
                <div className="buttons-info">
                    <button className="btn green" onClick={save}>Save</button>
                </div>
            </div>
        </ExpandPanel>
    )
}
export default EducationInfo