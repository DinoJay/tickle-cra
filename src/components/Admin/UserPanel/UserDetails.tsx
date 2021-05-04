import React, { CSSProperties } from 'react';
import UpdateUserInfo from './UpdateUserInfo';

import { User } from '~/constants/userFields';
import Topic from '~/constants/topicType';
import AlertButton from '~/components/utils/AlertButton';
import UserEnv from '~/constants/userEnvType';
import UserPreview from './UserPreview';

interface UserInfoProps {
  className?: string;
  style?: CSSProperties;
  onRemoveUser: Function;
  user: User | null;
  updateUser: Function;
  registerUserToEnv: Function;
  removeUserFromEnv: Function;
  topicDict: Topic[];
  envs: UserEnv[];
}

const UserDetails: React.FC<any> = props => {
  const {
    className,
    style,
    onRemoveUser,
    updateUser,
    registerUserToEnv,
    removeUserFromEnv,
    envs,
    user,
    topicDict
  } = props;

  return user ? (
    <div
      className={`flex flex-col flex-grow overflow-y-auto ${className} `}
      style={style}>
      <div className="flex p-2 border-2 mb-4 shadow-grey-light">
        <UserPreview user={user} />
      </div>
      <UpdateUserInfo
        {...props}
        {...user}
        topicDict={topicDict}
        envs={envs}
        removeUserFromEnv={removeUserFromEnv}
        registerUserToEnv={registerUserToEnv}
        onChange={(n: User) => updateUser({ ...user, ...n })}
      />
      <AlertButton
        type="button"
        className="mt-3 btn bg-red-500 p-2 text-white border-2 border-black flex-shrink-0 self-end"
        msg="Do you really want to delete the user?"
        onClick={onRemoveUser}>
        Remove User
      </AlertButton>
    </div>
  ) : null;
};
export default UserDetails;
