import React from 'react';
import UserEnv from '~/constants/userEnvType';
import AuthUser from '~/constants/authUserType';
interface EnvPanelProps {
    envs: UserEnv[];
    createEnv: (a: UserEnv) => any;
    removeEnv: (id: string) => any;
    fetchAllEnvs: () => any;
    authUser: AuthUser;
    selectUser: Function;
    changeUserEnv: Function;
    userEnvId: string;
    open: boolean;
    onClick: Function;
}
declare const EnvPanel: React.FC<EnvPanelProps>;
export default EnvPanel;
