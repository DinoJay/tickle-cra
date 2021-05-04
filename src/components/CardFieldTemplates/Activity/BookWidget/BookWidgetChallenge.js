import React from "react";
import BookWidget from "./BookWidget";
const BookWidgetChallenge = props => {
    const { activity, authUser, userEnvId, id } = props;
    const { teacher_id: teacherId, url } = activity || {
        teacher_id: null,
        url: null
    };
    return (React.createElement("div", { className: "flex flex-col flex-grow" }, url && (React.createElement(BookWidget, { authUser: authUser, userEnvId: userEnvId, id: id, teacherId: teacherId, bWidgetUrl: url }))));
};
export default BookWidgetChallenge;
