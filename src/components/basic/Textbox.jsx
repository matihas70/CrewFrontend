import { useRef } from 'react'
import '../../styles/Textbox.css'
function Textbox({ label, sendValue }) {

    const sendValOnChange = (event) => {
        sendValue(event.target.value)
    }

    return (
        <div className="textbox">
            <div className="label">
                <span>{label}</span>
            </div>
            <div>
                <input onChange={sendValOnChange} type="text" />
            </div>
        </div>
    )
}
export default Textbox