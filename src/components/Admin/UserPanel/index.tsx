import React, {useState, useEffect} from 'react';
import SearchIcon from 'react-feather/dist/icons/search';
import ThreeDots from '~/components/utils/ThreeDots';

import sortBy from 'lodash/sortBy';
// import uniqBy from 'lodash/uniqBy';
import clsx from 'clsx';
import Topic from '~/constants/topicType';
// import UserIcon from 'react-feather/dist/icons/user';
// import PlusIcon from 'react-feather/dist/icons/plus';
// import CheckIcon from 'react-feather/dist/icons/check';
// import DeleteIcon from 'react-feather/dist/icons/delete';

import InviteUserModal from './InviteUserModal';

import {User} from '~/constants/userFields';

import UserEvents from './UserEvents';

import DetailsFrame from '~/components/utils/DetailsFrame';

import calcPoints from '~/components/utils/calcPoints';

import {Card} from '~/constants/cardFields';
import UserEnv from '~/constants/userEnvType';
import Event from '~/constants/eventType';
import UserProfileModal from './UserProfileModal';

import UserPreview from './UserPreview';

interface UserListProps {
  cards?: Card[];
  envUsers: User[];
  userId: string | undefined;
  userModalOpen: boolean;
  toggleUserModal: Function;
  selectUser: Function;
}

const UserList: React.FC<UserListProps> = props => {
  const {
    cards,
    envUsers,
    userId,
    userModalOpen,
    toggleUserModal,
    selectUser
  } = props;

  const baseLiClass =
    'cursor-pointer border-b-2 p-1 m-1 text-lg flex justify-between items-center';
  const liClass = (u: User) =>
    `${baseLiClass} ${u.uid === userId && 'bg-gray-500'}`;

  const getPoints = (u: User) =>
    calcPoints(
      cards
        ? cards.filter(c => {
            const found =
              c.allActivitySubs &&
              c.allActivitySubs
                .filter(a => a.succeeded)
                .map(a => a.uid)
                .includes(u.uid);
            return found;
          })
        : []
    );

  return (
    <div className="overflow-y-auto h-64 flex flex-col ">
      {envUsers.length === 0 && (
        <div className="text-3xl text-grey m-auto uppercase">
          No Users
        </div>
      )}
      <ul className="list-reset m-2 ">
        {sortBy(envUsers, getPoints)
          .reverse()
          .map(u => (
            <li
              className={liClass(u)}
              key={u.uid}
              onClick={() => {
                userId === u.uid
                  ? toggleUserModal(!userModalOpen)
                  : selectUser(u.uid);
              }}>
              <button
                type="button"
                className="btn-invisible w-full flex p-1 justify-between">
                <span className="w-32 md:w-48 truncate">{u.email}</span>
                <div className="px-2 rounded-full bg-black text-white">
                  {getPoints(u)}XP
                </div>
                <span className="">{u.tmp && '(not registered)'}</span>
                <SearchIcon />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

interface UserPanelProps {
  className?: string;
  selectedUserId?: string;
  selectUser: Function;
  userRegErr?: any;
  updateUser: Function;
  users: User[];
  envs: UserEnv[];
  userEnvId: string;
  inviteUser?: Function;
  removeUserAccount?: Function;
  fetchUsers: Function;
  addUser: Function;
  open: boolean;
  onClick: Function;
  events: Event[];
  fetchAllUserEvents: Function;
  registerUserToEnv: Function;
  removeUserFromEnv: Function;
  topicDict: Topic[];
}

const UserPanel: React.FC<UserPanelProps> = props => {
  const {
    className,
    selectedUserId: userId,
    selectUser,
    updateUser,
    registerUserToEnv,
    removeUserFromEnv,
    users,
    envs,
    userEnvId,
    removeUserAccount,
    fetchUsers,
    open,
    onClick,
    events,
    fetchAllUserEvents,
    addUser,
    topicDict,
    userRegErr
  } = props;

  const [inviteUserModalOpen, toggleInviteUserModal] = useState<
    boolean
  >(false);

  const [userModalOpen, toggleUserModal] = useState<boolean>(false);

  const selectedUser =
    // TODO
    users.find(u => !!u.uid && u.uid === userId) || null;

  const {username: title = 'All Users'} = selectedUser || {};

  useEffect(() => {
    fetchUsers();
  }, [userEnvId]);

  const selectedEnv = envs.find(e => e.id === userEnvId);
  const envUsers = users.filter(
    u => selectedEnv && u.envIds && u.envIds.includes(selectedEnv.id)
  );

  // console.log('envUsers', envUsers);
  return (
    <DetailsFrame
      className={`${className} flex flex-col w-full`}
      open={open}
      onClick={onClick}
      header={
        <span>
          Users - <span className="font-bold">{title}</span>
        </span>
      }
      footer={
        <div className="ml-auto flex ">
          <button
            type="button"
            className="btn border-2 flex-grow mr-2 text-base p-1"
            onClick={() => toggleInviteUserModal(true)}>
            Invite User
          </button>
          <button
            type="button"
            className={clsx(
              'btn border-2 text-base flex-grow p-1',
              !selectedUser && 'bg-gray-600 text-white'
            )}
            onClick={() => selectUser(null)}>
            Event Overview
          </button>
        </div>
      }>
      <InviteUserModal
        {...props}
        addUser={addUser}
        user={selectedUser}
        users={users}
        envUsers={envUsers}
        userEnvId={userEnvId}
        visible={inviteUserModalOpen}
        onClose={() => toggleInviteUserModal(false)}
        userRegErr={userRegErr}
      />
      {selectedUser ? (
        <UserPreview
          className="ml-6 flex-grow overflow-hidden"
          user={selectedUser}
        />
      ) : (
        <UserEvents
          {...props}
          className="h-48"
          user={selectedUser}
          events={events}
          fetchAllUserEvents={fetchAllUserEvents}
        />
      )}
      <div className="mt-2 mb-2">
        <UserList
          {...props}
          envUsers={envUsers}
          userId={userId}
          userModalOpen={userModalOpen}
          toggleUserModal={toggleUserModal}
          selectUser={selectUser}
        />
        <UserProfileModal
          {...props}
          topicDict={topicDict}
          updateUser={updateUser}
          user={selectedUser}
          key="1"
          registerUserToEnv={registerUserToEnv}
          removeUserFromEnv={removeUserFromEnv}
          visible={userModalOpen}
          onClose={() => toggleUserModal(false)}
          onRemoveUser={() => {
            toggleUserModal(false);
            setTimeout(() => {
              selectedUser &&
                removeUserAccount &&
                removeUserAccount(selectedUser.uid);
            }, 300);
          }}
        />
      </div>
    </DetailsFrame>
  );
};

interface UserPanelWrapperProps {
  envs: UserEnv[];
  addUser: Function;
  updateUser: Function;
  fetchUsers: Function;
  selectUser: Function;
  open: boolean;
  userEnvId: string;
  onClick: Function;
  users: User[];
  events: Event[];
  fetchAllUserEvents: Function;
  registerUserToEnv: Function;
  removeUserFromEnv: Function;
  topicDict: Topic[];
}

const UserPanelWrapper: React.FC<UserPanelWrapperProps> = props => {
  const {
    envs,
    updateUser,
    users,
    onClick,
    open,
    addUser,
    fetchUsers,
    selectUser,
    events,
    fetchAllUserEvents,
    registerUserToEnv,
    removeUserFromEnv,
    topicDict
  } = props;

  if (!envs.length) return <div className="mt-3 w-full flex justify-center"><ThreeDots ></ThreeDots></div>;
  return (
    <UserPanel
      addUser={addUser}
      topicDict={topicDict}
      open={open}
      onClick={onClick}
      updateUser={updateUser}
      fetchUsers={fetchUsers}
      selectUser={selectUser}
      users={users}
      envs={envs}
      events={events}
      registerUserToEnv={registerUserToEnv}
      removeUserFromEnv={removeUserFromEnv}
      fetchAllUserEvents={fetchAllUserEvents}
      {...props}
    />
  );
};

export default UserPanelWrapper;
