import React, { useState } from "react";
// import PropTypes from 'prop-types';
// import MapGL from '~/components/utils/Map';
import MapBox, { Marker, Circle } from "~/components/utils/MapBox";
import DetailsFrame from "~/components/utils/DetailsFrame";
// import {parseTime, formatTime} from '~/components/utils/time';
import GoToPlace from "~/components/utils/GoToPlace";
const RADIUS_50 = 50;
const RADIUS_200 = 200;
const RADIUS_500 = 500;
const RADIUS_INFINITY = Infinity;
const GoToPlaceWrapper = props => {
    const [label, setLabel] = useState("");
    return (React.createElement(GoToPlace, Object.assign({ input: true }, props, { onLabelChange: setLabel, label: label, inputClassName: "form-input w-full" })));
};
const ContactForm = props => {
    const { hidden, lngLat, radius = Infinity, emailContact, telephone, comment, untilCollected = false, endDateTime, startDateTime, className, onChange, onSelect } = props;
    const btnClass = (m) => `${m === radius && "btn-active"} btn p-1 flex-grow`;
    const radians = [RADIUS_50, RADIUS_200, RADIUS_500, RADIUS_INFINITY];
    const onChangeMerge = (opts) => {
        onChange({
            radius,
            hidden,
            untilCollected,
            startDateTime,
            endDateTime,
            emailContact,
            telephone,
            comment,
            ...opts
        });
    };
    const [contactOpen, setContactOpen] = React.useState(false);
    const [showCardOpen, setShowCardOpen] = React.useState(false);
    return (React.createElement("div", { className: `flex flex-col ${className}` },
        React.createElement("div", { className: "mb-4" },
            React.createElement("label", { className: "form-label", htmlFor: "search" }, "Address"),
            React.createElement(GoToPlaceWrapper, { location: lngLat, className: "w-full", inputClassName: "border-2 w-full text-xl p-2 flex-grow", liClassName: "text-xl", onSelect: onSelect })),
        React.createElement(DetailsFrame, { open: contactOpen, onClick: () => setContactOpen(!contactOpen), header: React.createElement("h2", { className: "p-1" }, "Contact"), className: "mb-4 " },
            React.createElement("div", { className: "flex m-2 p-2 flex-wrap" },
                React.createElement("div", { className: "mr-4" },
                    React.createElement("label", { className: "form-label", htmlFor: "search" }, "Email"),
                    React.createElement("input", { className: "form-input", id: "email", type: "email", placeholder: "Email", value: emailContact || "", onChange: (e) => onChangeMerge({ emailContact: e.target.value }) })),
                React.createElement("div", { className: "" },
                    React.createElement("label", { className: "form-label", htmlFor: "search" }, "Telephone"),
                    React.createElement("input", { className: "form-input", id: "telephone", type: "number", value: telephone || "", placeholder: "Telephone", onChange: e => onChangeMerge({ telephone: e.target.value }) })))),
        React.createElement(DetailsFrame, { className: "mb-3", open: showCardOpen, onClick: () => setShowCardOpen(!showCardOpen), header: React.createElement("h2", { className: "p-1" }, "Show Card") },
            React.createElement("div", { className: "flex flex-col flex-wrap " },
                React.createElement("div", { className: "flex" },
                    React.createElement("div", { className: "mb-4 mr-4" },
                        React.createElement("label", { className: "form-label" }, "Until collected:"),
                        React.createElement("input", { id: "hidden", className: "m-1", type: "checkbox", checked: untilCollected, onChange: () => {
                                onChangeMerge({ untilCollected: !untilCollected });
                            } })),
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("label", { className: "form-label" }, "Until in range:"),
                        React.createElement("div", { className: "flex mb-1" }, radians.map(r => (React.createElement("button", { key: r, type: "button", className: btnClass(r), onClick: () => onChangeMerge({ radius: r }) },
                            r,
                            typeof r === "number" && "m")))))),
                React.createElement("div", { className: "mb-4 w-full" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "form-label" }, "Start:"),
                        React.createElement("input", { id: "hidden", className: "m-1 form-input", type: "datetime-local", value: startDateTime || "", onChange: (e) => {
                                onChangeMerge({ startDateTime: e.target.value });
                            } })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "form-label" }, "End:"),
                        React.createElement("input", { className: "m-1 form-input", type: "datetime-local", value: endDateTime || "", onChange: (e) => {
                                onChangeMerge({ endDateTime: e.target.value });
                            } })))),
            React.createElement("div", { className: "mb-2" },
                React.createElement("label", { className: "form-label", htmlFor: "Name" }, "Comment"),
                React.createElement("textarea", { style: { resize: "none" }, className: "overflow-y-auto form-input w-full", id: "comment", placeholder: "Comment", onChange: (e) => {
                        onChangeMerge({ comment: e.target.value });
                    } }, comment)))));
};
export const EditLocationMap = props => {
    const { loc, id, className, onChange } = props;
    const [mapViewport, setMapViewport] = useState({
        zoom: 14,
        ...loc.value
    });
    const { longitude, latitude, ...accOpts } = loc.value;
    const { emailContact = null, telephone = null, comment = null, startDateTime = null, endDateTime = null } = accOpts;
    const defaulAccOpts = {
        radius: RADIUS_INFINITY,
        hidden: false,
        untilCollected: false,
        ...accOpts
    };
    const lngLat = { longitude, latitude };
    // const cardDrop = (l: LngLat) => {
    //   onChange({...l, ...accOpts});
    // };
    // console.log('defaulAccOpts', defaulAccOpts);
    return (React.createElement("div", { className: `${className} flex flex-col relative` },
        React.createElement(ContactForm, Object.assign({}, defaulAccOpts, { startDateTime: startDateTime, endDateTime: endDateTime, emailContact: emailContact, telephone: telephone, comment: comment, lngLat: lngLat, onSelect: (l) => {
                onChange({ ...l, ...accOpts });
                setMapViewport({
                    ...mapViewport,
                    ...l
                });
            }, onChange: (acc) => {
                onChange({ ...lngLat, ...acc });
            } })),
        React.createElement("div", { className: "flex flex-col flex-grow" },
            React.createElement(MapBox, Object.assign({ className: "flex-grow" }, props, mapViewport),
                React.createElement(Marker, Object.assign({ color: accOpts.hidden ? "grey" : "#f2d024", draggable: true }, loc.value, { onDragEnd: (geoLoc) => onChange({ ...geoLoc, ...accOpts }) })),
                accOpts !== null && (React.createElement(Circle, Object.assign({ id: id }, loc.value, { radiusInM: accOpts.radius })))))));
};
export const ViewLocationMap = props => {
    const { loc, id } = props;
    const { longitude: _, latitude: __, ...accOpts } = loc.value;
    const { endDateTime, startDateTime, radius /* , hidden */ } = loc.value;
    const mvp = { zoom: 14, ...loc.value };
    return (React.createElement("div", { className: "w-full flex-grow flex flex-col" },
        React.createElement("div", { className: "flex flex-wrap justify-between mb-2" },
            endDateTime && startDateTime && (React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    React.createElement("h2", null, "Start:"),
                    React.createElement("div", null, startDateTime)),
                React.createElement("div", null,
                    React.createElement("h2", null, "End:"),
                    React.createElement("div", null, endDateTime)))),
            radius && (React.createElement("div", null,
                React.createElement("h2", null, "Radius:"),
                React.createElement("div", null,
                    radius,
                    " ",
                    typeof radius === "number" && "m")))),
        React.createElement(MapBox, Object.assign({ className: "relative z-40" }, props, mvp),
            React.createElement(Marker, Object.assign({ color: accOpts.hidden ? "grey" : "#f2d024" }, loc.value)),
            accOpts !== null && (React.createElement(Circle, Object.assign({ id: id }, loc.value, { radiusInM: accOpts.radius }))))));
};
