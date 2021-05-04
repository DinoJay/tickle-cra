import React, { Suspense, useState } from 'react';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';
import clsx from 'clsx';
import Search from 'react-feather/dist/icons/search';
// @ts-ignore
import usePromise from 'react-promise-suspense';
import { IMG } from '~/constants/cardFields';
import { ModalBody } from '~/components/utils/Modal';
import { PhotoPreview } from '~/components/utils/PhotoUpload';
import PreviewFrame from '../PreviewFrame';
import TabSlider from '~/components/utils/TabSlider';
export const key = IMG;
export const label = 'Image';
const PIXABAY = 'pixabay';
const UPLOAD = 'upload';
const UploadPhoto = props => {
    const { img, id, onChange, disabled } = props;
    const { type = UPLOAD } = (img && img.value) || {};
    return (React.createElement(PhotoPreview, Object.assign({ edit: !disabled, className: "flex-grow border-2", key: id }, (type === UPLOAD ? img.value : {}), { onChange: (imgVal) => {
            onChange({ key, label, value: imgVal });
        } }),
        React.createElement("div", null, "Edit Image")));
};
const fetchPixaBayJson = (input) => fetch(input, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin' // include, *same-origin, omit
})
    .then(res => (res ? res.json() : []))
    .then((obj) => obj.hits.map((d) => ({ ...d, id: d.id.toString() })))
    .catch(error => {
    console.log('err', error);
    return [];
});
const PhotoFetcher = props => {
    const { query, img, onChange } = props;
    const onChangeHelper = (value) => onChange({ key, label, value });
    const qs = `https://pixabay.com/api/?key=${process.env.PixaBay}&q=${query}&image_type=photo&pretty=true`;
    const data = usePromise(fetchPixaBayJson, [qs]);
    const { id: initId = null, thumbnail = null, type = null } = (img && img.value) || {};
    const id = type === PIXABAY ? initId : null;
    return (React.createElement("div", { className: "relative flex-grow" },
        data
            // .filter(
            //   (d: PixaBayImg) => !id || type !== PIXABAY || isSelected(d)
            // )
            .map((d) => (React.createElement("div", { className: "relative" },
            React.createElement("img", { alt: d.id, className: "m-1 w-full", src: d.previewURL }),
            React.createElement("button", { type: "button", onClick: () => {
                    if (id === d.id)
                        onChangeHelper(null);
                    else
                        onChangeHelper({
                            id: d.id,
                            name: d.id,
                            thumbnail: d.previewURL,
                            url: d.webformatURL,
                            type: PIXABAY
                        });
                }, className: clsx('absolute m-2 bottom-0 right-0 btn bg-white border-2 p-1 rounded-full', id === d.id ? 'border-red-500' : 'border-black') }, d.id !== id ? (React.createElement(Plus, null)) : (React.createElement(Minus, { className: "text-red-500" })))))),
        thumbnail && (React.createElement("div", { className: "fixed bottom-0 right-0 shadow m-3" },
            React.createElement("div", { className: "relative border-2 border-black " },
                React.createElement("img", { alt: thumbnail, src: thumbnail }),
                React.createElement("button", { onClick: () => onChangeHelper(null), type: "button", className: "border-2 border-red-500 bg-white m-1 rounded-full absolute right-0 bottom-0" },
                    React.createElement(Minus, { className: "text-red-500" })))))));
};
const Unsplash = props => {
    const { onChange, img } = props;
    const [query, setQuery] = useState('');
    const [inputVal, setInputVal] = useState('');
    return (React.createElement("div", { className: "flex-grow flex flex-col" },
        React.createElement("div", { className: "flex p-1" },
            React.createElement("input", { onChange: e => setInputVal(e.target.value), value: inputVal, className: "form-control w-full border-2", placeholder: "Search for images", type: "text" }),
            React.createElement("button", { className: "btn ml-1 border-2 p-1 rounded-full px-2", type: "button", onClick: () => setQuery(inputVal) },
                React.createElement(Search, null))),
        React.createElement(Suspense, { fallback: "Loading..." },
            React.createElement(PhotoFetcher, { img: img, query: query, onChange: onChange }))));
};
export const ModalContent = props => {
    const { id, modalProps } = props;
    const [tabIndex, setTabIndex] = useState(0);
    const btnClassName = (i) => `flex-grow btn p-2 border-2 text-lg ${tabIndex === i &&
        'btn-active'}`;
    return (React.createElement(ModalBody, Object.assign({}, modalProps, { key: id, className: "flex flex-grow" }),
        React.createElement("div", { className: "flex my-2" },
            React.createElement("button", { className: `${btnClassName(0)} mr-1`, type: "button", onClick: () => setTabIndex(0) }, "Upload"),
            React.createElement("button", { type: "button", className: btnClassName(1), onClick: () => setTabIndex(1) }, "Search")),
        React.createElement(TabSlider, { visibleIndex: tabIndex, className: "flex-grow flex flex-col" },
            React.createElement(UploadPhoto, Object.assign({}, props)),
            React.createElement(Unsplash, Object.assign({}, props)))));
};
export const Preview = ({ onClick, img }) => (React.createElement(PreviewFrame, { onClick: onClick, type: label, placeholder: "Img", empty: img.value === null, content: () => (React.createElement("div", { className: "truncate-text" }, (img.value && img.value.name) || (img.value && img.value.url))) }));
export const View = ({ img, onClose, modalProps }) => (React.createElement(ModalBody, { className: "flex flex-col flex-grow", onClose: modalProps.onClose, title: "Photo" },
    React.createElement("div", { className: "flex-grow", style: {
            backgroundImage: `url(${img.value && img.value.url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        } })));
