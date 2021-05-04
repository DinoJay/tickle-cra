import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
import PreviewTag from '~/components/utils/PreviewTag';
const AnimatedPreviewTopic = props => {
    const { onClick, id, selected, className, img, points, title, onUpdatePoints, onRemove } = props;
    return (React.createElement("div", { onClick: () => onClick && onClick(), key: id, className: `cursor-pointer m-2 flex relative justify-center items-center ${className}` },
        selected && (React.createElement("button", { type: "button", className: "z-10 absolute btn right-0 top-0 bg-red-500 shadow ml-2", onClick: () => onRemove && onRemove() },
            React.createElement(X, { color: "white" }))),
        React.createElement("div", { className: `${!selected ? '' : 'h-24 w-24'}  ` },
            React.createElement(PreviewTag, { points: points, className: "w-full h-full", img: img, title: title })),
        selected && (React.createElement("div", { className: "w-full absolute bottom-0 flex justify-center" },
            React.createElement("button", { type: "button", className: "btn bg-yellow-500 shadow mr-2", onClick: () => onUpdatePoints &&
                    onUpdatePoints(Math.max(10, points - 10)) },
                React.createElement(Minus, { color: "white" })),
            React.createElement("button", { type: "button", className: "btn bg-green-500 shadow", onClick: () => onUpdatePoints &&
                    onUpdatePoints(Math.min(100, points + 10)) },
                React.createElement(Plus, { color: "white " }))))));
};
// function isObject(obj) {
//   return obj === Object(obj);
// }
// const defaultTags = ts =>
//   Array.isArray(ts) ? (ts.every(isObject) ? ts : []) : [];
export const EditMetaTags = props => {
    const { allTags, onChange, selectedTags } = props;
    // eslint-disable-next-line
    const [tags, setTags] = useState(selectedTags);
    const tagIds = tags.map(d => d.id);
    const [selectedId, setSelectedId] = useState(null);
    const addDatum = (d) => setTags((sks) => uniqBy([...sks, d], 'id'));
    const updateDatum = (d) => {
        const ts = tags.reduce((acc, e) => e.id === d.id ? [...acc, { ...e, ...d }] : [...acc, e], []);
        setTags(ts);
    };
    const removeDatum = (skId) => setTags(tags.filter((d) => d.id !== skId));
    useDidUpdateEffect(() => {
        onChange(tags);
    }, [useDeepCompareMemoize(tags)]);
    const availableTags = allTags.filter(sk => !tagIds.includes(sk.id));
    const addedTagDivs = (React.createElement(React.Fragment, null, tags.map(s => (React.createElement(AnimatedPreviewTopic, Object.assign({ points: s.points || 10 }, s, { selected: selectedId === s.id, onClick: () => {
            setSelectedId(s.id);
        }, onRemove: () => removeDatum(s.id), onUpdatePoints: (ps) => {
            updateDatum({ ...s, points: ps });
        }, key: s.id }))))));
    const availableTagDivs = (React.createElement(React.Fragment, null, availableTags.map(s => (React.createElement(AnimatedPreviewTopic, Object.assign({}, s, { selected: false, onUpdatePoints: () => null, onRemove: () => null, points: 0, onClick: () => {
            addDatum(s);
        }, key: s.id }))))));
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null, "Available"),
        React.createElement("div", { className: "flex my-3 flex-base-0-grow flex-wrap overflow-y-auto border-2" }, availableTags.length > 0 ? (availableTagDivs) : (React.createElement("div", { className: "m-auto text-grey uppercase text-xl" }, "Nothing available"))),
        React.createElement("h2", null, "Selected"),
        React.createElement("div", { className: "flex mt-3 flex-base-0-grow flex-wrap overflow-y-auto border-2" }, tags.length > 0 ? (addedTagDivs) : (React.createElement("div", { className: "m-auto text-grey uppercase text-xl" }, "Nothing selected")))));
};
export const MetaTags = props => {
    const { selectedTags } = props;
    // TODO tags more than ids?
    const tags = selectedTags;
    const addedTagDivs = (React.createElement(React.Fragment, null, tags.map(s => (React.createElement(AnimatedPreviewTopic, Object.assign({ key: s.id }, s, { selected: false }))))));
    return (React.createElement("div", { className: "flex-grow flex flex-col" },
        React.createElement("div", { className: "flex mt-3 flex-wrap flex-grow overflow-y-auto" }, addedTagDivs)));
};
