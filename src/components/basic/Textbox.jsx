import { useRef } from 'react'
import '../../styles/Textbox.css'
function Textbox({ label, reference, initValue, id }) {

    return (
        <div className="control textbox">
            <div className="label">
                <span>{label}</span>
            </div>
            <div>
                <input className='control-input textbox-input'
                    id={id}
                    ref={reference}
                    type="text"
                    defaultValue={initValue} />
            </div>
        </div>
    )
}
export default Textbox