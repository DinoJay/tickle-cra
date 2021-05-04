import React from "react";
import AuthUser from "~/constants/authUserType";
interface BookWidgetsPanelProps {
    authUser: AuthUser;
    updateAuthUser: Function;
    width: number;
    open: boolean;
    onClick: Function;
}
declare const BookWidgetsPanel: React.FC<BookWidgetsPanelProps>;
export default BookWidgetsPanel;
