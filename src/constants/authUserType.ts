import {User} from './userFields';
import UserEnv from './userEnvType';
// import Reward from './reward_type';

export default interface AuthUser extends User {
  teacherId?: string;
  userEnvs: UserEnv[];
  rewardIds: string[];
  superadmin?: boolean;
}
