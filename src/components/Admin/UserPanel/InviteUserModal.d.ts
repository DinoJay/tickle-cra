import React from "react";
import { User } from "~/constants/userFields";
interface UserEmailFormProps {
    className?: string;
    onChange: Function;
    title: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    error?: {
        message: string;
    };
}
export declare const UserEmailForm: React.FC<UserEmailFormProps>;
declare const InviteUserModal: React.FC<{
    visible: boolean;
    onClose: Function;
    addUser: Function;
    users: User[];
    addUserToEnv: Function;
    delete: Function;
    envUsers: User[];
    userEnvId: string;
    userRegErr: any;
    user: User | null;
}>;
export default InviteUserModal;
