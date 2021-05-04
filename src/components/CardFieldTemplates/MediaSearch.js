import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import PlusSquare from 'react-feather/dist/icons/plus';
import Trash2 from 'react-feather/dist/icons/trash-2';
import uniqBy from 'lodash/uniqBy';
import { theme } from 'Tailwind';
const { colors } = theme;
const MediaBtn = ({ selected, onClick, className }) => (React.createElement("div", { className: `btn ${className}`, style: {
        color: selected ? colors.red[500] : colors.green[500]
    }, onClick: () => onClick() }, selected ? (React.createElement(Trash2, { className: "border-4 border-red-500", color: colors.red[300], size: 40 })) : (React.createElement(PlusSquare, { className: "border-4 border-green-500", color: colors.green[400], size: 40 }))));
export const MediaSearch = props => {
    const { searchFn, defaultQuery = 'Brussels', onChange, Element, selectedData } = props;
    const [searchResults, setSearchResults] = useState([]);
    const doSearch = (q) => searchFn(q).then(setSearchResults);
    const removeItem = (id) => onChange(selectedData.filter(d => d.id !== id));
    const addItem = (item) => onChange([...selectedData, item]);
    useEffect(() => {
        doSearch(defaultQuery);
    }, []);
    const selectedIds = selectedData.map((d) => d.id);
    return (React.createElement("div", { className: "flex flex-col flex-grow" },
        React.createElement("input", { type: "text", className: "form-control border-2 text-lg mt-3 mb-3 w-full", placeholder: `Search...for instance ${defaultQuery}`, onChange: evt => doSearch(evt.target.value) }),
        React.createElement("div", { className: "flex-grow overflow-y-auto", style: {
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0
            } }, searchResults.map(d => (React.createElement("div", { className: "relative border-2 p-2 flex mb-3" },
            React.createElement(Element, Object.assign({}, props, d)),
            React.createElement(MediaBtn, { className: "absolute right-0 bottom-0 m-4 bg-white", selected: selectedIds.includes(d.id), onClick: () => {
                    selectedIds.includes(d.id)
                        ? removeItem(d.id)
                        : addItem(d);
                } })))))));
};
export const MediaOverview = props => {
    const { data, className, Element } = props;
    return (React.createElement("div", { className: `${className} flex flex-col flex-1-1-0` },
        data.length === 0 && (React.createElement("h3", { className: "text-muted" }, "No media added to this Card!")),
        React.createElement("div", { className: "overflow-y-auto" }, data.map(d => (React.createElement("div", { className: "relative flex p-2 mb-3 border border-2" },
            React.createElement(Element, Object.assign({}, props, d))))))));
};
export const EditMediaOverview = props => {
    const { data, videoIdFn, onChange, className, Element } = props;
    const [inputId, setInputId] = useState('');
    const removeItem = (m) => {
        const newData = data.filter((d) => d.id !== m.id);
        onChange(newData);
    };
    return (React.createElement("div", { className: `${className} flex flex-col flex-1-1-0` },
        data.length === 0 && (React.createElement("h3", { className: "text-muted" }, "No media added to this Card!")),
        React.createElement("div", { className: "overflow-y-auto" }, data.map(d => (React.createElement("div", { className: "relative flex p-2 mb-3 border border-2" },
            React.createElement(Element, Object.assign({}, props, d)),
            React.createElement(MediaBtn, { className: "absolute right-0 bottom-0 m-3 bg-white", selected: true, onClick: () => removeItem(d) }))))),
        React.createElement("form", { className: "flex mt-auto p-1 flex-shrink-0", onSubmit: e => {
                e.preventDefault();
                videoIdFn(inputId).then((items) => {
                    onChange(uniqBy([...data, ...items], 'id'));
                    setInputId('');
                });
            } },
            React.createElement("input", { className: "form-input", placeholder: "Add Video By ID", value: inputId, onChange: e => setInputId(e.target.value) }),
            React.createElement("button", { className: "btn bg-gray-500 text-white ml-1 px-2", disabled: inputId === '', type: "submit" }, "Add"))));
};
