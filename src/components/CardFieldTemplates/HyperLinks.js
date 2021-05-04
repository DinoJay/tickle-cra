import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';
import uniqBy from 'lodash/uniqBy';
// import PropTypes from 'prop-types';
// import sortBy from 'lodash/sortBy';
// import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
// import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import LinkIcon from 'react-feather/dist/icons/link';
import X from 'react-feather/dist/icons/x';
import { ModalBody } from '~/components/utils/Modal';
import { HYPERLINKS } from '~/constants/cardFields';
// TODO change
// import softSkillDict from '~/constants/softSkillData';
import NewTabLink from '~/components/utils/NewTabLink';
import PreviewFrame from './PreviewFrame';
// import ElementPanel from '~/components/Admin/ElementPanel';
// import {EditMetaTags} from './MetaTags';
export const key = HYPERLINKS;
export const label = 'Links';
export const ModalContent = props => {
    const { hyperlinks: { value }, onChange, modalProps } = props;
    const linkArray = value || [];
    const linkUrls = linkArray.map(l => l.url);
    const [curLink, setCurLink] = useState(null);
    const disabledSubmit = !curLink ||
        !curLink.url ||
        !curLink.title ||
        linkUrls.includes(curLink.url);
    const defaultLink = {
        url: 'no url',
        title: 'no title',
        id: uuidv1()
    };
    return (React.createElement(ModalBody, Object.assign({}, modalProps),
        React.createElement("form", { className: "h-64 flex flex-col", onSubmit: (e) => {
                e.preventDefault();
                onChange({
                    key,
                    label,
                    value: uniqBy([...linkArray, { ...curLink, id: uuidv1() }], 'url')
                });
                setCurLink(null);
            } },
            linkArray && (React.createElement("ul", { className: "list-reset mb-3" }, linkArray.map(l => (React.createElement("li", { className: "flex border-b-2 text-lg mb-1 items-center" },
                React.createElement(LinkIcon, { className: "mr-1" }),
                React.createElement("div", null,
                    React.createElement(NewTabLink, { href: l.url }, l.title)),
                React.createElement("button", { className: "ml-auto p-1 btn", type: "button", onClick: () => onChange({
                        key,
                        label,
                        value: linkArray.filter(e => e.url !== l.url)
                    }) },
                    React.createElement(X, { size: 20 }))))))),
            (!linkArray || linkArray.length === 0) && (React.createElement("div", { className: "text-2xl text-grey m-auto" }, "No Links")),
            React.createElement("div", { className: "flex mt-auto" },
                React.createElement("div", null,
                    React.createElement("input", { placeholder: "Title", value: (curLink && curLink.title) || '', className: "form-control border-2", onChange: (e) => setCurLink({
                            ...(curLink || defaultLink),
                            title: e.target.value
                        }) })),
                React.createElement("div", null,
                    React.createElement("input", { placeholder: "Url", type: "url", value: (curLink && curLink.url) || defaultLink.url, className: "form-control border-2 mx-1", onChange: (e) => setCurLink({
                            ...(curLink || defaultLink),
                            url: e.target.value
                        }) })),
                React.createElement("button", { type: "submit", disabled: disabledSubmit, className: "btn border-2 p-2 flex-grow" }, "Add")))));
};
export const View = props => {
    const { onClick, hyperlinks, modalProps } = props;
    const arr = hyperlinks.value || [];
    return (React.createElement(ModalBody, { onClose: modalProps.onClose, title: label },
        React.createElement("div", { onClick: () => onClick() },
            React.createElement("ul", { className: "list-reset text-xl" }, arr.map(d => (React.createElement(NewTabLink, { href: d.url, className: "m-1" }, d.title)))))));
};
export const Preview = props => {
    const { onClick, hyperlinks } = props;
    return (React.createElement(PreviewFrame, { onClick: onClick, placeholder: "hyperlinks", type: label, empty: hyperlinks.value === null, content: () => (React.createElement("div", { className: "flex flex-wrap" }, hyperlinks &&
            Array.isArray(hyperlinks.value) &&
            hyperlinks.value.map(d => (React.createElement(NewTabLink, { href: d.url, className: "m-1" }, d.title))))) }));
};
