import '../../styles/Selectbox.css'
function Selectbox({ label, reference, initValue, options = [] }) {

    return (
        <div className="control selectbox">
            <div className="control-label">
                <span>{label}</span>
            </div>
            <div>
                <select className="control-input selectbox-input"
                    ref={reference}
                    defaultValue={initValue}>
                    {options.map(o => <option value={o.id} key={o.value}>{o.value}</option>)}
                </select>
            </div>
        </div>
    )
}
export default Selectbox;