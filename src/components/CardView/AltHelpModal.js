import React, { useEffect, useState } from 'react';
import uuidv1 from 'uuid/v1';
import AtSign from 'react-feather/dist/icons/at-sign';
import Phone from 'react-feather/dist/icons/phone';
import Mic from 'react-feather/dist/icons/mic';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ThreeDots from '~/components/utils/ThreeDots';
import TabSlider from '~/components/utils/TabSlider';
import X from 'react-feather/dist/icons/x';
const Btn = props => (React.createElement("button", Object.assign({}, props, { className: clsx('btn border-2 p-2 flex-grow text-gray-700', props.className), type: "button" })));
const RadioBtn = ({ children, className, onChange }) => {
    const uid = uuidv1();
    return (React.createElement("div", { className: clsx('flex items-center ', className) },
        React.createElement("input", { id: uid, type: "radio", name: "radio", className: "hidden", onChange: onChange }),
        React.createElement("label", { htmlFor: uid, className: "flex flex-grow items-center cursor-pointer " },
            React.createElement("span", { className: "w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink" }),
            children)));
};
const ContactForm = ({ onLeftClick, onRightClick, onChange, contactType }) => (React.createElement("div", { className: "text-4xl p-2 flex flex-col flex-grow" },
    React.createElement("p", null, "How to Contact?"),
    React.createElement("p", { className: "border-b-2" }, "Choose One:"),
    React.createElement("form", { onSubmit: e => e.preventDefault(), className: "mt-3" },
        React.createElement(RadioBtn, { className: "mb-2", onChange: () => onChange('telephone') },
            React.createElement(Phone, { className: "mr-1" }),
            React.createElement("div", null, "Telephone")),
        React.createElement(RadioBtn, { onChange: () => onChange('email') },
            React.createElement(AtSign, { className: "mr-1" }),
            React.createElement("div", null, "Email"))),
    React.createElement("div", { className: "mt-auto flex justify-between text-2xl p-2" },
        React.createElement(Btn, { className: "mr-2", onClick: onLeftClick }, "Prev"),
        React.createElement(Btn, { onClick: onRightClick, disabled: !contactType, className: !contactType && 'disabled' }, "Next"))));
const Summary = ({ onLeftClick, onSubmitClick, helpReq }) => (React.createElement("div", { className: "p-2 flex text-xl flex-col flex-grow" },
    React.createElement("div", null,
        React.createElement("h3", { className: "text-2xl" }, " What"),
        helpReq.action),
    React.createElement("div", null,
        React.createElement("h3", { className: "text-2xl" }, " When"),
        helpReq.time),
    React.createElement("div", null,
        React.createElement("h3", { className: "text-2xl" }, " contact"),
        helpReq.contactType),
    React.createElement("div", { className: "mt-auto flex justify-between text-2xl p-2" },
        React.createElement(Btn, { className: "mr-2", onClick: onLeftClick }, "Prev"),
        React.createElement(Btn, { onClick: onSubmitClick }, "Submit"))));
const recognizeSpeech = (updateText, toggleStart) => {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function () {
        console.log('start');
        toggleStart(true);
    };
    recognition.onerror = function (event) {
        console.log('error', event);
    };
    recognition.onend = function () {
        toggleStart(false);
    };
    recognition.onresult = function (event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
                console.log('updateText', transcript);
                updateText(transcript);
            }
        }
    };
    return recognition;
};
const useMem = (fn) => {
    const r = React.useRef(null);
    useEffect(() => {
        r.current = fn(); // recognizeSpeech(setTxt);
    }, []);
    return r.current;
};
const WhatForm = ({ authUser, onLeftClick, onRightClick, onChange, action }) => {
    const [started, setStarted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const speechRecognition = useMem(() => recognizeSpeech(onChange, setProcessing));
    useEffect(() => {
        console.log('SpeechRecognition', speechRecognition);
        if (speechRecognition) {
            if (started)
                speechRecognition.start();
            else
                speechRecognition.stop();
        }
    }, [started]);
    return (React.createElement("div", { className: "p-2 text-4xl flex-grow flex flex-col" },
        React.createElement("div", { className: "" },
            "Hi ",
            authUser.username),
        React.createElement("p", { className: "mb-2 border-b-2" }, "What would you like to do?"),
        React.createElement("div", { className: "flex w-full flex-grow justify-center items-center" },
            React.createElement("button", { type: "button", onClick: () => setStarted(!started) },
                React.createElement(motion.div, { positionTransition: true },
                    React.createElement(Mic, { size: 80, className: clsx(started ? 'text-black' : 'text-gray-500') })),
                processing && React.createElement(ThreeDots, null))),
        React.createElement("textarea", { value: action, placeholder: "type text", onChange: (e) => onChange(e.target.value), rows: 5, className: "text-xl border-2 form-control mx-2" }),
        React.createElement("div", { className: "mt-auto flex justify-between text-2xl p-2" },
            React.createElement(Btn, { onClick: onRightClick, disabled: !action, className: !action && 'disabled' }, "Next"))));
};
const WhenForm = ({ onLeftClick, onRightClick, onChange, time }) => (React.createElement("div", { className: "text-4xl p-2 flex flex-col flex-grow" },
    React.createElement("p", { className: "" }, "Ok! sounds good!"),
    React.createElement("p", { className: "border-b-2" }, "When would you like to do this?"),
    React.createElement("form", { className: "text-2xl mt-3", onSubmit: e => e.preventDefault() },
        React.createElement(RadioBtn, { onChange: () => onChange('today') },
            React.createElement("div", { className: "flex flex-grow justify-between" },
                React.createElement("div", null, "Today"))),
        React.createElement(RadioBtn, { className: "my-2", onChange: () => {
                onChange('tomorrow');
            } },
            React.createElement("div", { className: "flex flex-grow justify-between" },
                React.createElement("div", null, "Tomorrow"))),
        React.createElement(RadioBtn, { onChange: () => onChange('this week') },
            React.createElement("div", { className: "flex flex-grow justify-between" },
                React.createElement("div", null, "This week")))),
    React.createElement("div", { className: "mt-auto flex justify-between text-2xl p-2" },
        React.createElement(Btn, { className: "mr-2", onClick: onLeftClick }, "Prev"),
        React.createElement(Btn, { onClick: onRightClick, disabled: !time, className: !time && 'disabled' }, "Next"))));
const HelpModal = props => {
    const { onClose, authUser, addHelpRequest, userLocation, userEnvId } = props;
    const [visibleIndex, setVisibleIndex] = useState(0);
    const onLeftClick = () => setVisibleIndex(visibleIndex - 1);
    const onRightClick = () => setVisibleIndex(visibleIndex + 1);
    const initHelpRequest = {
        id: uuidv1(),
        type: 'help',
        action: null,
        time: null,
        loc: { value: { ...userLocation } },
        contactType: null
    };
    const [helpReq, setHelpReq] = useState(initHelpRequest);
    return (React.createElement("div", { className: "flex-grow relative flex flex-col z-50 bg-white p-3" },
        React.createElement("button", { onClick: onClose, type: "button", className: "z-50 btn absolute right-0 top-0 m-3" },
            React.createElement(X, null)),
        React.createElement("div", { className: "flex-grow flex flex-col" },
            React.createElement(TabSlider, { visibleIndex: visibleIndex, className: "flex flex-col flex-grow" },
                React.createElement(WhatForm, Object.assign({}, helpReq, { authUser: authUser, onLeftClick: onLeftClick, onRightClick: onRightClick, onChange: (action) => {
                        console.log('action', action);
                        setHelpReq({ ...helpReq, action });
                    } })),
                React.createElement(WhenForm, { time: helpReq.time, onLeftClick: onLeftClick, onRightClick: onRightClick, onChange: (time) => setHelpReq({ ...helpReq, time }) }),
                React.createElement(ContactForm, { contactType: helpReq.contactType, onLeftClick: onLeftClick, onRightClick: onRightClick, onChange: (contactType) => setHelpReq({ ...helpReq, contactType }) }),
                React.createElement(Summary, { helpReq: helpReq, onLeftClick: onLeftClick, onSubmitClick: () => {
                        setHelpReq(initHelpRequest);
                        addHelpRequest({ userEnvId, helpRequest: helpReq });
                        setHelpMode(false);
                        setVisibleIndex(0);
                    } })))));
};
export default HelpModal;
