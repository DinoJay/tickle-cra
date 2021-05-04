import { User } from './userFields';
import UserEnv from './userEnvType';
export default interface AuthUser extends User {
    teacherId?: string;
    userEnvs: UserEnv[];
    rewardIds: string[];
    superadmin?: boolean;
}
