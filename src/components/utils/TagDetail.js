import React from 'react';
const TagDetail = props => {
    const { className, style, title, onClick, img, description, 
    // points,
    // available,
    url } = props;
    const bgStyle = {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${img ? img.url : url})`
    };
    return (React.createElement("div", { className: `shadow-md cursor-pointer flex bg-white flex-col ${className}`, style: { ...style }, onClick: () => onClick && onClick() },
        React.createElement("div", { className: "bg-black flex justify-center w-full uppercase font-bold" },
            React.createElement("h1", { className: "m-1 truncate text-white" }, title)),
        React.createElement("div", { style: { flex: '0 0 40%', ...bgStyle } }),
        React.createElement("div", { className: "flex-grow w-full flex flex-col overflow-y-auto" },
            React.createElement("p", { className: "p-4" }, description || 'No Description'))));
};
export default TagDetail;
