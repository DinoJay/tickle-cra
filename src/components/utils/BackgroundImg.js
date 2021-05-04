import React from 'react';
const BackgroundImg = ({ style, src, contain, onClick, ...restProps }) => (React.createElement("div", Object.assign({ onClick: () => onClick && onClick(), style: {
        backgroundImage: `url(${src}) `,
        backgroundSize: contain ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...style
    } }, restProps)));
export default BackgroundImg;
