import React, { useState, useEffect } from 'react';
import { ModalBody } from '~/components/utils/Modal';
import { CANVAS } from '~/constants/cardFields';
import PreviewFrame from '../PreviewFrame';
import SelectField from '~/components/utils/SelectField';
import ThreeDots from '~/components/utils/ThreeDots';
export const key = CANVAS;
export const label = 'Canvas';
export const ModalContent = props => {
    const { modalProps, disabled, canvas, onChange } = props;
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [modules, setModules] = useState([]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://canvas.instructure.com/api/v1/courses?access_token=7~yjocrczsRkEYubIqnM6kS1C8zyn7TeV5rjVJ6gcu9UYQ87D8SsVSOxiBA6LkVdiU')
            .then(response => response.json())
            .then(data => {
            setCourses(data);
            setSelectedCourse(data[0]);
        });
    }, []);
    useEffect(() => {
        if (selectedCourse) {
            fetch(`https://cors-anywhere.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${selectedCourse.id}/modules?include[]=items&access_token=7~yjocrczsRkEYubIqnM6kS1C8zyn7TeV5rjVJ6gcu9UYQ87D8SsVSOxiBA6LkVdiU`)
                .then(response => response.json())
                .then(data => {
                setModules(data);
                setSelectedModule(data[0]);
            });
        }
    }, [selectedCourse]);
    useEffect(() => {
        if (selectedModule && selectedCourse) {
            fetch(`https://cors-anywhere.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${selectedCourse.id}/modules/${selectedModule.id}/items?access_token=7~yjocrczsRkEYubIqnM6kS1C8zyn7TeV5rjVJ6gcu9UYQ87D8SsVSOxiBA6LkVdiU`)
                .then(response => response.json())
                .then(data => {
                setItems(data);
                setSelectedItem(data[0]);
                setIsLoading(false);
            });
        }
    }, [selectedModule]);
    useEffect(() => {
        if (selectedCourse && selectedModule && selectedItem) {
            onChange({
                key,
                label,
                value: {
                    courseId: selectedCourse.id,
                    moduleId: selectedModule.id,
                    itemId: selectedItem.id
                }
            });
        }
    }, [selectedItem]);
    return (React.createElement(ModalBody, Object.assign({}, modalProps), isLoading ? (React.createElement("div", { className: "m-auto p-40" },
        React.createElement(ThreeDots, null))) : (React.createElement("div", null,
        selectedCourse && courses.length && (React.createElement("div", { className: "flex flex-col justify-center" },
            React.createElement("div", { className: "form-label" }, "Choose a course"),
            React.createElement(SelectField, { className: "bg-white flex-grow z-50 mb-3", selectedClassName: "px-2 border-2 border-black text-lg flex items-center py-1 ", optionClassName: "px-2 py-1", values: courses.map(c => ({
                    key: c.id,
                    label: c.name,
                    course: c
                })), onChange: value => setSelectedCourse(value.course), selectedId: selectedCourse.id }))),
        selectedModule && modules.length && (React.createElement("div", { className: "flex flex-col justify-center" },
            React.createElement("div", { className: "form-label" }, "Choose a module"),
            React.createElement(SelectField, { className: "bg-white flex-grow z-40 mb-3", selectedClassName: "px-2 border-2 border-black text-lg flex items-center py-1 ", optionClassName: "px-2 py-1", onChange: value => {
                    setSelectedModule(value.module);
                }, values: modules.map(m => ({
                    key: m.id,
                    label: m.name,
                    module: m
                })), selectedId: selectedModule.id }))),
        selectedItem && items.length && (React.createElement("div", { className: "flex flex-col justify-center" },
            React.createElement("div", { className: "form-label" }, "Choose a item"),
            React.createElement(SelectField, { className: "bg-white flex-grow mb-8", selectedClassName: "px-2 border-2 border-black text-lg flex items-center py-1 ", optionClassName: "px-2 py-1", onChange: value => {
                    setSelectedItem(value.item);
                }, values: items.map(i => ({
                    key: i.id,
                    label: i.title,
                    item: i
                })), selectedId: selectedItem.id }))),
        React.createElement("button", { type: "button", className: "w-full p-2 btn flex-grow border-2" }, "Submit")))));
};
export const Preview = ({ canvas, onClick }) => (React.createElement(PreviewFrame, { onClick: onClick, empty: canvas.value === null, content: () => canvas.value.itemId, type: label }));
export const View = ({ canvas, onClose }) => (React.createElement(ModalBody, { title: "Canvas", onClose: onClose },
    React.createElement("p", { style: { width: '100%' } }, canvas.value.itemId)));
