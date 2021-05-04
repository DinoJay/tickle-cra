import React from "react";
import BackgroundImg from "~/components/utils/BackgroundImg";
const TopicDetail = props => {
    const { description, img, onClick } = props;
    return (React.createElement("div", { className: "flex flex-col flex-grow" },
        img && (React.createElement(BackgroundImg, { className: "w-full h-64", src: img.url, style: { backgroundSize: "contain" } })),
        React.createElement("p", null, description || "No description"),
        React.createElement("div", { className: "flex flex-wrap overflow-y-auto" }),
        React.createElement("button", { onClick: onClick, type: "button", className: "w-full btn p-2 border-2" }, "Select Topic")));
};
export default TopicDetail;
