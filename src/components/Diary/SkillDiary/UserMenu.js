import React from 'react';
import Edit from 'react-feather/dist/icons/edit-2';
import { StringParam, useQueryParams, BooleanParam } from 'use-query-params';
// import {DecodedValueMap} from 'serialize-query-params/types';
import avatarDict, { avatars } from '~/constants/avatars';
import TopRightTriangleBtn from '~/components/utils/TopRightTriangleBtn';
import { PhotoUpload } from '~/components/utils/PhotoUpload';
import PreviewTag from '~/components/utils/PreviewTag';
import BackgroundImg from '~/components/utils/BackgroundImg';
import TagDetail from '~/components/utils/TagDetail';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
const imgUrlStyle = (url) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
});
const UserModal = props => {
    const { open, selectedUserType, onClose, setUserTypeId, updateAuthUser } = props;
    const flexClass = 'flex flex-wrap justify-between';
    return (React.createElement(BlackModal, { visible: open },
        React.createElement(ModalBody, { className: "flex-grow flex flex-col", title: "Avatars", onClose: () => onClose() }, selectedUserType ? (React.createElement("div", { key: "selected", className: "flex flex-col flex-grow w-full" },
            React.createElement(TagDetail, { className: "flex-grow mb-3 w-full", title: selectedUserType.title, url: selectedUserType.img.url }),
            React.createElement("div", { className: "flex" },
                React.createElement("button", { onClick: () => setUserTypeId(null), type: "button", className: "btn p-2 text-white bg-yellow-500 flex-grow" }, "Back"),
                React.createElement("button", { onClick: () => {
                        updateAuthUser({ avatar: selectedUserType.id });
                        onClose();
                    }, type: "button", className: "btn p-2 text-white bg-green-500 flex-grow" }, "Select")))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { key: avatarDict.scout.title },
                React.createElement("h2", null, avatarDict.scout.title),
                React.createElement("div", { className: flexClass }, avatarDict.scout.imgs.map(u => (React.createElement(PreviewTag, { url: u.url, title: u.name, onClick: () => setUserTypeId(u.id) }))))),
            React.createElement("div", { key: avatarDict.supporter.title, className: "my-8" },
                React.createElement("h2", null, avatarDict.supporter.title),
                React.createElement("div", { className: flexClass }, avatarDict.supporter.imgs.map(u => (React.createElement(PreviewTag, { url: u.url, title: u.name, onClick: () => setUserTypeId(u.id) }))))),
            React.createElement("div", { key: avatarDict.entrepreneur.title },
                React.createElement("h2", null, avatarDict.entrepreneur.title),
                React.createElement("div", { className: flexClass }, avatarDict.entrepreneur.imgs.map(u => (React.createElement(PreviewTag, { url: u.url, title: u.name, onClick: () => setUserTypeId(u.id) }))))))))));
};
const UserMenu = props => {
    const { authUser, open, updateAuthUser } = props;
    const [query, setQuery] = useQueryParams({
        modalUserTypeOpen: BooleanParam,
        userTypeId: StringParam
    });
    const { userTypeId, modalUserTypeOpen } = query;
    // TODO:fix later
    const updateQuery = (u) => setQuery({ ...query, ...u });
    const selectedUserType = avatars.find(a => a.id === userTypeId);
    const avatar = authUser.avatar && avatars.find(a => a.id === authUser.avatar);
    const avatarImg = avatar && avatar.img;
    return (React.createElement("div", { className: "w-full mb-3 flex justify-end items-end justify-between cursor-pointer relative overflow-hidden", style: {
            flex: `${!open ? '0 100 6%' : '1 0 30%'}`,
            transition: 'all 300ms',
            ...(authUser.img && imgUrlStyle(authUser.img.url))
        } },
        React.createElement("h1", { className: "absolute bg-black px-1 top-0 left-0 m-1 text-2xl text-white" }, authUser.username),
        React.createElement(TopRightTriangleBtn, { className: "absolute top-0 right-0" },
            React.createElement(PhotoUpload, { className: "flex items-center ", uploadBtn: React.createElement("div", { className: "flex justify-end w-full h-full" },
                    React.createElement(Edit, { className: "mr-2 mt-2", color: "white" })), onChange: (newImg) => {
                    updateAuthUser({
                        img: newImg
                    });
                } })),
        React.createElement("button", { className: `bg-white text-black border-black w-24 h-24 ml-auto mb-2 mr-2 flex flex-col ${!avatar &&
                'border-4'}`, style: { fontSize: '4rem' }, type: "button", onClick: () => updateQuery({ modalUserTypeOpen: true }) }, avatarImg ? (React.createElement(BackgroundImg, { className: "w-24 h-24", src: avatarImg.url, contain: true })) : (React.createElement("div", { className: "text-center w-full" }, "!"))),
        React.createElement(UserModal, Object.assign({}, props, { selectedUserType: selectedUserType, open: !!modalUserTypeOpen, onClose: () => updateQuery({ modalUserTypeOpen: false, userTypeId: null }), setUserTypeId: (id) => updateQuery({ userTypeId: id }) }))));
};
export default UserMenu;
