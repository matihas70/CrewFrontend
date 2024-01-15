import { useSearchParams } from "react-router-dom"
import '../styles/Activated.css'
function Activated() {
    const [params, setParams] = useSearchParams();
    const isActivated = params.get('isActivated') == "true" ? true : false

    console.log(isActivated);
    return (
        <div className="placeholder">
            <img className="status-icon" src={`/icons/${isActivated ? "tick" : "error"}.svg`} alt="" />
            <span>{isActivated ? "Good" : "Bad"}</span>
        </div>
    )
}

export default Activated