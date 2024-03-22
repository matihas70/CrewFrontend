import { useRef, cloneElement, useState, createElement } from "react";
import "../../styles/Addable.css";

function Addable({ children, references, dataArrayCount }) {
    const [contents, setContents] = useState([]);
    const add = (e) => {

        setContents(prev => [...prev, children])
    }

    return (
        <div className="addable-container">
            <div className="addable-content">
                {contents.map((c, i) => [c])}
            </div>
            <div className="addable-add" onClick={add}>
                <img className="addable-img" src="icons/add.svg" alt="" />
            </div>
        </div>
    )
}
export default Addable