import React, { useState } from "react";
import ChevronsLeft from "react-feather/dist/icons/chevrons-left";
import ChevronsRight from "react-feather/dist/icons/chevrons-right";
import clsx from "clsx";
import { ModalBody, BlackModal } from "~/components/utils/Modal";
import { doInviteUser } from "~/firebase/db/user_db";

import TabSlider from "~/components/utils/TabSlider";

import { User, initUserFields } from "~/constants/userFields";

interface SendInvitationEmailProps {
  userProfile?: User;
  error: {
    message: string;
  };
  onSubmit: Function;
}

const SendInvitationEmail: React.FC<SendInvitationEmailProps> = props => {
  const { onSubmit } = props;

  const [subject, setSubject] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  return (
    <form
      className="flex flex-col h-full"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ subject, body }).catch((err: string) =>
          setError({ message: err })
        );
      }}
    >
      <section className="mb-2">
        <h2 className="mb-2">Subject:</h2>
        <input
          onChange={e => setSubject(e.target.value)}
          placeholder="Your Subject"
          className="form-control w-full border-2"
        />
      </section>
      <section className="">
        <h2 className="mb-2">Message:</h2>
        <textarea
          onChange={e => setBody(e.target.value)}
          placeholder="Your message"
          className="w-full form-control border-2"
          rows={10}
        />
      </section>
      <button type="submit" className="btn border-2 p-2">
        Send Email
      </button>
      {error && (
        <div className="alert my-auto bg-red-500">{`${error.message}!!!`}</div>
      )}
    </form>
  );
};

interface InviteUserFormProps {
  addUser: Function;
  userRegErr: string;
  // user: User | null;
}

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

export const UserEmailForm: React.FC<UserEmailFormProps> = props => {
  const { onChange, email, firstName, lastName, error } = props;
  return (
    <>
      <h2 className="mb-2">Contact:</h2>
      <form
        className="flex flex-col justify-center "
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex items-center justify-center  mb-3">
          <div className="">
            <input
              value={email || undefined}
              className="form-control border-2 w-full"
              onChange={event => onChange({ email: event.target.value })}
              type="email"
              placeholder="email"
            />
            <input
              value={firstName || undefined}
              className="form-control
              my-2 flex-grow border-2 w-full"
              onChange={event => onChange({ firstName: event.target.value })}
              type="text"
              placeholder="First name"
            />
            <input
              value={lastName || undefined}
              className="form-control flex-grow border-2 w-full"
              onChange={event => onChange({ lastName: event.target.value })}
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="mt-auto ">
          {error && (
            <div className="alert mb-2 bg-red-500">{error.message}</div>
          )}
        </div>
      </form>
    </>
  );
};

const InviteNewUserForm: React.FC<InviteUserFormProps> = props => {
  const { addUser, userRegErr } = props;
  const [userProfile, setUserProfile] = useState({ ...initUserFields });
  const updateUserProfile = (u: User) => setUserProfile(o => ({ ...o, ...u }));

  return (
    <div className="flex-grow flex flex-col">
      <div key="0" className="flex-grow flex flex-col p-2">
        <UserEmailForm
          {...userProfile}
          title="Invite User"
          onChange={updateUserProfile}
          className="flex-grow"
        />
        <SendInvitationEmail
          userProfile={userProfile}
          error={{ message: userRegErr }}
          onSubmit={(msg: string) =>
            // TODO
            doInviteUser({ ...userProfile, msg }).then(() =>
              addUser(userProfile)
            )
          }
        />
      </div>
    </div>
  );
};

const InviteExistingUser: React.FC<{
  users: User[];
  envUsers: User[];
  addUserToEnv: Function;
  excludeUserFromEnv: Function;
  updateUser: Function;
  userEnvId: string;
}> = props => {
  const [inputStr, setInputStr] = useState("");

  const {
    users,
    envUsers,
    userEnvId,
    addUserToEnv,
    excludeUserFromEnv
  } = props;
  console.log(
    "users",
    users.filter(u => !u.email)
  );
  const uids = envUsers.map(e => e.uid);
  return (
    <div className="flex flex-col flex-grow pr-4 overflow-hidden">
      <input
        className="form-control border-2 "
        placeholder="Search for User"
        onChange={e => setInputStr(e.target.value)}
      />
      <ul className="flex-grow w-full overflow-y-auto ">
        {users
          .filter(u => u.email?.toLowerCase().includes(inputStr))
          .map(u => (
            <li className="w-full cursor-pointer border-b-2 p-1 m-1 text-lg flex justify-between items-center ">
              <div>{u.email}</div>
              <input
                type="checkbox"
                checked={uids.includes(u.uid)}
                onChange={e => {
                  if (e.target.checked) {
                    // ADD ENV TO THE USER
                    addUserToEnv({ envId: userEnvId, usrInfo: u });
                    // updateUser({
                    //   ...u,
                    //   envIds: [...(u.envIds || []), userEnvId]
                    // });
                  } else {
                    // REMOVE ENV FROM USER
                    excludeUserFromEnv({ envId: userEnvId, usrInfo: u });
                    // updateUser({
                    //   ...u,
                    //   envIds: u.envIds.filter(envId => envId !== userEnvId)
                    // });
                  }
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

const InviteUserModal: React.FC<any> = props => {
  const {
    visible,
    onClose,
    users,
    envUsers,
    userEnvId,
    userRegErr,
    user
  } = props;
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  const cls = "btn border mr-1 p-2 flex-grow";
  const highlight = (i: number) =>
    visibleIndex === i && "bg-gray-500 text-white";

  return (
    <BlackModal visible={visible}>
      <ModalBody
        className="flex-grow overflow-hidden"
        title={user ? user.email : "new user"}
        onClose={onClose}
      >
        <div className="flex flex-col mt-3 flex-grow overflow-y-auto">
          <div className="flex p-1">
            <button
              type="button"
              className={clsx(cls, highlight(0))}
              onClick={() => setVisibleIndex(0)}
            >
              Invite Existing User
            </button>
            <button
              onClick={() => setVisibleIndex(1)}
              type="button"
              className={clsx(cls, highlight(1))}
            >
              Invite New User
            </button>
          </div>
          <TabSlider visibleIndex={visibleIndex}>
            <InviteExistingUser
              {...props}
              users={users}
              envUsers={envUsers}
              userEnvId={userEnvId}
            />
            <InviteNewUserForm {...props} userRegErr={userRegErr} />
          </TabSlider>
        </div>
      </ModalBody>
    </BlackModal>
  );
};
export default InviteUserModal;
