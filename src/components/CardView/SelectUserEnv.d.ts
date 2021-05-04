import React, { CSSProperties } from 'react';
import AuthUser from '~/constants/authUserType';
interface SelectUserEnvProps {
    authUser: AuthUser;
    match: any;
    className?: string;
    style?: CSSProperties;
    history: any;
    userEnvId: string;
    onClose: Function;
}
declare const SelectUserEnv: React.FC<SelectUserEnvProps>;
export default SelectUserEnv;
