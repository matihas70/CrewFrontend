import Textbox from "../basic/Textbox"
import { Outlet } from "react-router-dom"
import { useRef, useState } from "react";
import '../../styles/ExpandPanel.css'
function ExpandPanel({ children, iconPath, title }) {
    const [expanded, setExpanded] = useState(false);
    const onTitleClick = (e) => {
        setExpanded(prev => !prev)
    }

    return (
        <div className="expand-panel-container">
            <div className="expand-panel-title" onClick={onTitleClick}>
                <img src={iconPath} alt="" />
                <span>{title}</span>
            </div>

            <div className={"expand-panel" + (expanded ? " expanded" : "")}>
                <div className="expand-panel-inner">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default ExpandPanel;