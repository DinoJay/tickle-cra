import React, { useState } from "react";
import uuidv1 from "uuid/v1";
import AuthoringWidget from "./AuthoringWidget";
import ResultsWidget from "./ResultsWidget";
import DetailsFrame from "~/components/utils/DetailsFrame";
import { BlackModal, ModalBody } from "~/components/utils/Modal";
const BookWidgetsPanel = props => {
    const [refreshKey, setRefreshKey] = useState(uuidv1());
    const [teacherModal, setTeacherModal] = useState(false);
    const [gradingModal, setGradingModal] = useState(false);
    window.addEventListener("message", event => {
        if (event.origin === "https://us-central1-tickle-194510.cloudfunctions.net") {
            setRefreshKey(uuidv1());
        }
    });
    const { authUser, updateAuthUser, width, open, onClick } = props;
    const [teacherId, setTeacherId] = useState(authUser.teacherId);
    const baseURL = "https://www.bookwidgets.com/lti/results";
    return (React.createElement(DetailsFrame, { className: "BookWidgets Panel", open: open, title: "BookWidgets", onClick: onClick },
        React.createElement(AuthoringWidget, { key: refreshKey, userId: authUser.uid, email: authUser.email, firstName: authUser.firstName, lastName: authUser.lastName, teacherId: authUser.teacherId }),
        React.createElement("button", { className: "btn border-2 p-2 mt-2 w-full text-base", type: "button", onClick: () => {
                setTeacherModal(true);
            } }, "Add TeacherID"),
        React.createElement("button", { className: `btn border-2 p-2 mt-2 w-full text-base ${!teacherId &&
                "disabled"}`, disabled: !teacherId, type: "button", onClick: () => {
                setGradingModal(true);
            } }, "Grade Bookwidgets"),
        React.createElement(BlackModal, { className: "flex-grow m-auto", visible: teacherModal },
            React.createElement(ModalBody, { title: "Add teacher ID", onClose: () => {
                    setTeacherModal(false);
                } },
                React.createElement("div", null,
                    React.createElement("input", { name: "teacherId", className: "w-full form-control border-2 text-lg", style: { flexGrow: 0.75 }, value: teacherId, placeholder: "Add Teacher ID", onChange: e => setTeacherId(e.target.value) }),
                    React.createElement("button", { className: "btn border-2 p-2 mt-2 w-full text-base", type: "button", onClick: () => {
                            updateAuthUser({ teacherId });
                            setTeacherModal(false);
                        } }, "Save")))),
        React.createElement(BlackModal, { className: "flex-grow m-auto", visible: gradingModal, style: { maxWidth: width, width } },
            React.createElement(ModalBody, { title: "Grade Bookwidgets", onClose: () => {
                    setGradingModal(false);
                } },
                React.createElement("div", null, gradingModal && (React.createElement(ResultsWidget, { baseURL: baseURL, email: authUser.email, firstName: authUser.firstName, lastName: authUser.lastName, teacherId: authUser.teacherId, userId: authUser.uid, height: 0 })))))));
};
export default BookWidgetsPanel;
