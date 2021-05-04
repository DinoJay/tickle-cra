import { SessionActionTypes } from './types';
import AuthUser from '~/constants/authUserType';
import { User } from '~/constants/userFields';
export interface SessionStateType {
    authUser: null | AuthUser;
    device: {
        smallScreen: boolean;
        iOs: boolean;
    };
    users: User[];
    userEnvId: string;
    xp: number;
}
declare function sessionReducer(state: SessionStateType | undefined, action: SessionActionTypes): SessionStateType;
export default sessionReducer;
