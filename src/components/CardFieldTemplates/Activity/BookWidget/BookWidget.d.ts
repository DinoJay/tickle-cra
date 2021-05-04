import React from "react";
import AuthUser from "~/constants/authUserType";
interface BookWidgetProps {
    authUser: AuthUser;
    teacherId: string;
    bWidgetUrl: string;
    userEnvId: string;
    id: string;
}
declare const BookWidget: React.FC<BookWidgetProps>;
export default BookWidget;
