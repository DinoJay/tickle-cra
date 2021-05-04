import React, { useState } from "react";
import uuidv1 from "uuid/v1";
import { PhotoPreview } from "~/components/utils/PhotoUpload";
const AddUrl = props => {
    const { onChange, url } = props;
    const [imgUrl, setImgUrl] = useState(url);
    return (React.createElement("div", { className: "mt-3 flex w-full border-2 " },
        React.createElement("input", { className: "p-2 text-lg flex-grow font-bold ", value: imgUrl, placeholder: "Add Image Url", type: "url", onChange: e => setImgUrl(e.target.value) }),
        React.createElement("button", { className: "bg-grey text-white p-2 uppercase font-bold hover:bg-grey-dark", type: "button", onClick: () => onChange({
                url: imgUrl,
                name: imgUrl,
                id: uuidv1()
            }) }, "Add Url")));
};
const EditImg = props => {
    const { className } = props;
    return (React.createElement("div", { className: `${className} flex flex-col editImg relative ` },
        React.createElement(PhotoPreview, Object.assign({ className: "flex-grow border mb-2" }, props)),
        React.createElement(AddUrl, Object.assign({ className: "hidden flex-shrink-0" }, props))));
};
export default EditImg;
