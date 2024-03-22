import "../../styles/Datebox.css"
function Datebox({ label, reference, initValue, id }) {


    return (
        <div className="control datebox">
            <div className="control-label">
                <span>{label}</span>
            </div>
            <div>
                <input className="control-input datebox-input"
                    id={id}
                    ref={reference}
                    defaultValue={initValue}
                    type="date" />
            </div>
        </div>
    )
}
export default Datebox;