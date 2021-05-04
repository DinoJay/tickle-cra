import React, { useState, useEffect } from "react";
const AlertButton = ({ className, style, type = "button", children, msg, onClick }) => {
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        if (clicked) {
            const response = window.confirm(msg);
            if (response) {
                onClick();
            }
            setClicked(false);
        }
    }, [clicked]);
    return (React.createElement("button", { type: type, className: className, style: style, onClick: () => setClicked(true) }, children));
};
export default AlertButton;
