import '../../styles/Textbox.css'
function Textbox({ label }) {
    return (
        <div className="textbox">
            <div className="label">
                <span>{label}</span>
            </div>
            <div>
                <input type="text" />
            </div>
        </div>
    )
}
export default Textbox