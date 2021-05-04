import React from "react";
declare const AlertButton: React.FC<{
    className?: string;
    style?: React.CSSProperties;
    type: "submit" | "reset" | "button";
    msg: string;
    onClick: Function;
}>;
export default AlertButton;
