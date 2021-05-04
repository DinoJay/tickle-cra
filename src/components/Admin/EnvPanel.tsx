import uuidv1 from 'uuid/v1';
import clsx from 'clsx';

import React, { useState, useEffect } from 'react';
import DetailIcon from 'react-feather/dist/icons/search';

import { BlackModal, ModalBody } from '~/components/utils/Modal';

import DetailsFrame from '~/components/utils/DetailsFrame';

import { PhotoPreview } from '~/components/utils/PhotoUpload';
import UserEnv from '~/constants/userEnvType';
import AuthUser from '~/constants/authUserType';
import { Img } from '~/constants/typeUtils';

const baseLiClass: string =
  'cursor-pointer p-1 text-lg flex justify-between items-center';

interface UpdateUserEnvProps {
  userEnv: UserEnv;
  close: () => void;
  createEnv: (env: UserEnv) => any;
  onRemove: () => void;
  removable?: boolean;
  setUserEnv: (param: object) => void;
  authUser: AuthUser;
}

const UpdateUserEnv: React.FC<UpdateUserEnvProps> = props => {
  const {
    userEnv,
    close,
    createEnv,
    onRemove,
    removable,
    setUserEnv,
    authUser
  } = props;

  const {
    name = '',
    img = null,
    description = '',
    id = null,
    publicEnv = false
  } = userEnv;
  const { uid } = authUser;

  return (
    <ModalBody title="Create a new User Environment" onClose={close}>
      <form>
        <div className="my-2">
          <div className="mb-1 font-bold">Title</div>
          <input
            name="title"
            className="w-full form-control border-2 text-lg"
            style={{ flexGrow: 0.75 }}
            value={name}
            placeholder="Add Title"
            onChange={e => {
              setUserEnv({ name: e.target.value });
            }}
          />
        </div>
        <div>
          <div className="mb-1 font-bold">Image:</div>
          <PhotoPreview
            edit
            {...img}
            onChange={(m: Img) => setUserEnv({ img: m })}
            className="h-48 w-full border mb-2"
          />
        </div>
        <div className="my-2 ">
          <div className="mb-1 font-bold">Description</div>
          <textarea
            value={description}
            name="descr"
            placeholder="Add description"
            rows={5}
            className="form-control border-2 w-full"
            onChange={e => setUserEnv({ description: e.target.value })}
          />
        </div>
        <div className="flex my-2 justify-between ">
          <div className="mb-1 font-bold">Public</div>
          <input
            type="checkbox"
            name="publicEnv"
            value="public"
            checked={publicEnv}
            onChange={() => setUserEnv({ publicEnv: !publicEnv })}
          />
        </div>

        <button
          type="button"
          disabled={!name}
          className={clsx(
            !name && 'disabled',
            'p-1 btn border-2 text-base w-full'
          )}
          onClick={() => {
            if (name) {
              createEnv({
                id: id || uuidv1(),
                name,
                img,
                description,
                publicEnv,
                uids: [],
                cards: [],
                rewards: [],
                authorId: uid,
                users: [uid]
              });
              close();
            }
          }}>
          {id ? 'Update' : 'Create'}
        </button>

        {removable && (
          <button
            className="btn p-1 bg-red-500 text-white mt-1 w-full"
            type="button"
            onClick={e => {
              e.stopPropagation();
              const r = window.confirm(
                'Do you really want to delete the Environment?'
              );
              if (r === true) {
                onRemove();
              }
            }}>
            Remove
          </button>
        )}
      </form>
    </ModalBody>
  );
};

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

const EnvPanel: React.FC<EnvPanelProps> = props => {
  const {
    envs,
    createEnv,
    removeEnv,
    fetchAllEnvs,
    authUser,
    selectUser,
    changeUserEnv,
    userEnvId,
    open,
    onClick
  } = props;

  const env = envs.find((d: UserEnv) => d.id === userEnvId) || null;
  const { userEnvs } = authUser;
  const userEnvIds = userEnvs.map((d: UserEnv) => d.id);

  const filteredEnvs = envs;

  const { name: userEnvName = null, id: selectedUserEnvId = null } =
    env || {};

  useEffect(() => {
    fetchAllEnvs();
  }, []);

  const isOwnEnv = (envId: string) =>
    userEnvIds.find(id => id === envId) !== undefined;

  const deletable = (d: UserEnv) =>
    d &&
    d.id === userEnvId &&
    (isOwnEnv(d.id) || authUser.superadmin) &&
    d.id !== 'default';

  const [userEnv, setUserEnv] = useState<any | null>(null);

  const mergeState = (newState: object) =>
    setUserEnv({
      ...(userEnv as object),
      ...(newState as object)
    } as UserEnv);

  const closeModal = () => setUserEnv(null);

  const liClass = (d: UserEnv, i: number) =>
    `${baseLiClass} ${selectedUserEnvId === d.id &&
    'bg-gray-500'} ${i !== filteredEnvs.length - 1 &&
    'border-b'} btn-invisble w-full ${d.id === 'default' &&
    'disabled flex items-center'}`;

  return (
    <DetailsFrame
      title={
        <span className="break-words">
          User environment{' '}
          <span className="font-bold">{userEnvName}</span>
        </span>
      }
      open={open}
      onClick={onClick}>
      <ul className="p-2 overflow-y-auto" style={{ maxHeight: 400 }}>
        {filteredEnvs.map((d, i) => (
          <button
            type="button"
            className={liClass(d, i)}
            onClick={() => {
              selectUser(null);
              if (userEnvId === d.id && d.id !== 'default')
                setUserEnv(d);
              changeUserEnv(d.id);
            }}>
            <div>{d.name}</div>
            {d.id === userEnvId && d.id !== 'default' && <DetailIcon />}
          </button>
        ))}
      </ul>
      <div className="w-full p-2 flex">
        <button
          className="flex-grow btn border-2 p-2 m-2 text-base"
          onClick={() =>
            setUserEnv({
              authorId: authUser!.uid,
              uids: [],
              rewards: [],
              cards: [],
              name: '',
              img: null,
              description: '',
              // id: uuidv1(),
              publicEnv: false
            })
          }
          type="button">
          Add new Environment
        </button>
      </div>
      {userEnv && (
        <BlackModal visible={userEnv !== null}>
          <UpdateUserEnv
            {...props}
            userEnv={userEnv}
            close={closeModal}
            createEnv={createEnv}
            removable={deletable(userEnv)}
            onRemove={() => {
              removeEnv(userEnv.id);
              closeModal();
              // TODO remove from userEnvs
              // TODO remove from userEnvs
              // TODO remove from userEnvs
              // TODO remove from userEnvs
              // TODO remove from userEnvs
              changeUserEnv('default');
            }}
            setUserEnv={mergeState}
          />
        </BlackModal>
      )}
    </DetailsFrame>
  );
};

export default EnvPanel;
