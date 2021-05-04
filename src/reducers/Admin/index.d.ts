import { User } from '~/constants/userFields';
import UserEnv from '~/constants/userEnvType';
import Event from '~/constants/eventType';
import { AdminActionTypes } from './types';
export interface AdminStateType {
    users: User[];
    selectedUserId: string | null;
    envs: UserEnv[];
    envUserIds: string[];
    userRegErr: object | null;
    events: Event[];
}
export default function reducer(state: AdminStateType | undefined, action: AdminActionTypes): AdminStateType;
