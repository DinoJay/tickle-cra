import React from "react";
interface AuthoringWidgetProps {
    userId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    teacherId: string | undefined;
}
declare const AuthoringWidget: React.FC<AuthoringWidgetProps>;
export default AuthoringWidget;
