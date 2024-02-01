import { useRef } from 'react'
import '../../styles/Textbox.css'
function Textbox({ label, reference, sendValue, id }) {

    const sendValOnChange = (event) => {
        sendValue(event.target.value)
    }

    return (
        <div className="textbox">
            <div className="label">
                <span>{label}</span>
            </div>
            <div>
                <input id={id} ref={reference} onChange={sendValOnChange} type="text" />
            </div>
        </div>
    )
}
export default Textbox