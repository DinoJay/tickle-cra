import React from 'react';
const NewTabLink = ({ href, className, style, children }) => (React.createElement("a", { className: className, target: "_blank", href: href, rel: "noopener", style: {
        ...style,
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#007bff',
        backgroundColor: 'transparent'
    } }, children));
export default NewTabLink;
