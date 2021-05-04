import React from "react";
interface Url {
    url: string;
    name: string;
    id: string;
}
interface EditImgProps {
    url: string;
    name: string;
    className?: string;
    onChange: (a: Url) => void;
}
declare const EditImg: React.FC<EditImgProps>;
export default EditImg;
