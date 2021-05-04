import React from "react";
import BookWidget from "./BookWidget";
import AuthUser from "~/constants/authUserType";
interface BookWidget {
    nonAuthUrl: string;
    short_code: string;
    teacher_id: string;
    title: string;
    url: string;
}
interface BookWidgetChallengeProps {
    authUser: AuthUser;
    activity: BookWidget;
    userEnvId: string;
    id: string;
}
declare const BookWidgetChallenge: React.FC<BookWidgetChallengeProps>;
export default BookWidgetChallenge;
