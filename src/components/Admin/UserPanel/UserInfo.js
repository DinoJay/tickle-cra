import React from 'react';
import userSvg from '~/styles/user.svg';
import UpdateUserInfo from './UpdateUserInfo';
import AlertButton from '~/components/utils/AlertButton';
export const UserThumbnail = props => {
    const { user, className, style } = props;
    const st = (url) => ({
        ...style,
        backgroundImage: `url(${url}) `,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    });
    return (React.createElement("img", { className: `${className} `, style: st((user && user.photoURL) || userSvg), alt: "test" }));
};
export const UserPreviewInfo = props => {
    const { user, style, className } = props;
    const { username } = user;
    return (React.createElement("div", { className: `${className} h-64 relative`, style: style },
        React.createElement("div", { className: "w-full z-10 absolute flex-auto flex flex-wrap m-2" },
            React.createElement("div", { className: "m-1 bg-white px-1" },
                React.createElement("div", null, username))),
        React.createElement(UserThumbnail, { user: user, className: "w-full h-full absolute " })));
};
export const UserInfo = props => {
    const { className, style, onRemoveUser, user, updateUser, registerUserToEnv, removeUserFromEnv, envs, topicDict } = props;
    return user ? (React.createElement("div", { className: `flex flex-col flex-grow overflow-y-auto ${className} `, style: style },
        React.createElement("div", { className: "flex justify-around p-2 border-2 mb-4 shadow-grey-light" },
            React.createElement(UserThumbnail, { className: "w-min-48 h-min-48 mx-2 ", user: user }),
            React.createElement("div", { className: "text-2xl" },
                React.createElement("div", null, user.username || 'No Username'),
                React.createElement("div", null, user.firstName || 'No first name'),
                React.createElement("div", null, user.lastName || 'No last name'))),
        React.createElement(UpdateUserInfo, Object.assign({}, props, user, { topicDict: topicDict, envs: envs, removeUserFromEnv: removeUserFromEnv, registerUserToEnv: registerUserToEnv, onChange: (n) => updateUser({ ...user, ...n }) })),
        React.createElement(AlertButton, { type: "button", className: "mt-3 btn bg-red-500 p-2 text-white border-2 border-black flex-shrink-0 self-end", msg: "Do you really want to delete the user?", onClick: onRemoveUser }, "Remove User"))) : null;
};
