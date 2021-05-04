import React from "react";
interface AddUrlProps {
    onChange: Function;
    style?: React.CSSProperties;
    className?: string;
    url: string;
}
declare const AddUrl: React.FC<AddUrlProps>;
export default AddUrl;
