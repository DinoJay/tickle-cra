import React from 'react';
import Edit from 'react-feather/dist/icons/edit-2';

import {
  StringParam,
  useQueryParams,
  BooleanParam
} from 'use-query-params';
// import {DecodedValueMap} from 'serialize-query-params/types';

import avatarDict, {avatars, Avatar} from '~/constants/avatars';

import TopRightTriangleBtn from '~/components/utils/TopRightTriangleBtn';
import {PhotoUpload} from '~/components/utils/PhotoUpload';
import PreviewTag from '~/components/utils/PreviewTag';
import BackgroundImg from '~/components/utils/BackgroundImg';

import TagDetail from '~/components/utils/TagDetail';

import {BlackModal, ModalBody} from '~/components/utils/Modal';
import {Img} from '~/constants/typeUtils';
import AuthUser from '~/constants/authUserType';

const imgUrlStyle = (url: string): object => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
});

const UserModal: React.FC<{
  open: boolean;
  selectedUserType?: Avatar;
  onClose: Function;
  setUserTypeId: Function;
  updateAuthUser: Function;
}> = props => {
  const {
    open,
    selectedUserType,
    onClose,
    setUserTypeId,
    updateAuthUser
  } = props;

  const flexClass = 'flex flex-wrap justify-between';

  return (
    <BlackModal visible={open}>
      <ModalBody
        className="flex-grow flex flex-col"
        title="Avatars"
        onClose={(): void => onClose()}>
        {selectedUserType ? (
          <div
            key="selected"
            className="flex flex-col flex-grow w-full">
            <TagDetail
              className="flex-grow mb-3 w-full"
              title={selectedUserType.title}
              url={selectedUserType.img.url}
            />
            <div className="flex">
              <button
                onClick={() => setUserTypeId(null)}
                type="button"
                className="btn p-2 text-white bg-yellow-500 flex-grow">
                Back
              </button>
              <button
                onClick={() => {
                  updateAuthUser({avatar: selectedUserType.id});
                  onClose();
                }}
                type="button"
                className="btn p-2 text-white bg-green-500 flex-grow">
                Select
              </button>
            </div>
          </div>
        ) : (
          <>
            <div key={avatarDict.scout.title}>
              <h2>{avatarDict.scout.title}</h2>
              <div className={flexClass}>
                {avatarDict.scout.imgs.map(u => (
                  <PreviewTag
                    url={u.url}
                    title={u.name}
                    onClick={() => setUserTypeId(u.id)}
                  />
                ))}
              </div>
            </div>
            <div key={avatarDict.supporter.title} className="my-8">
              <h2>{avatarDict.supporter.title}</h2>
              <div className={flexClass}>
                {avatarDict.supporter.imgs.map(u => (
                  <PreviewTag
                    url={u.url}
                    title={u.name}
                    onClick={() => setUserTypeId(u.id)}
                  />
                ))}
              </div>
            </div>
            <div key={avatarDict.entrepreneur.title}>
              <h2>{avatarDict.entrepreneur.title}</h2>
              <div className={flexClass}>
                {avatarDict.entrepreneur.imgs.map(u => (
                  <PreviewTag
                    url={u.url}
                    title={u.name}
                    onClick={() => setUserTypeId(u.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </ModalBody>
    </BlackModal>
  );
};

const UserMenu: React.FC<{
  authUser: AuthUser;
  open: boolean;
  updateAuthUser: Function;
}> = props => {
  const {authUser, open, updateAuthUser} = props;

  const [query, setQuery] = useQueryParams({
    modalUserTypeOpen: BooleanParam,
    userTypeId: StringParam
  });

  const {userTypeId, modalUserTypeOpen} = query;
  // TODO:fix later
  const updateQuery = (u: any): void => setQuery({...query, ...u});

  const selectedUserType = avatars.find(a => a.id === userTypeId);
  const avatar =
    authUser.avatar && avatars.find(a => a.id === authUser.avatar);

  const avatarImg = avatar && avatar.img;

  return (
    <div
      className="w-full mb-3 flex justify-end items-end justify-between cursor-pointer relative overflow-hidden"
      style={{
        flex: `${!open ? '0 100 6%' : '1 0 30%'}`,
        transition: 'all 300ms',
        ...(authUser.img && imgUrlStyle(authUser.img.url))
      }}>
      <h1 className="absolute bg-black px-1 top-0 left-0 m-1 text-2xl text-white">
        {authUser.username}
      </h1>
      <TopRightTriangleBtn className="absolute top-0 right-0">
        <PhotoUpload
          className="flex items-center "
          uploadBtn={
            <div className="flex justify-end w-full h-full">
              <Edit className="mr-2 mt-2" color="white" />
            </div>
          }
          onChange={(newImg: Img): void => {
            updateAuthUser({
              img: newImg
            });
          }}
        />
      </TopRightTriangleBtn>
      <button
        className={`bg-white text-black border-black w-24 h-24 ml-auto mb-2 mr-2 flex flex-col ${!avatar &&
          'border-4'}`}
        style={{fontSize: '4rem'}}
        type="button"
        onClick={(): void => updateQuery({modalUserTypeOpen: true})}>
        {avatarImg ? (
          <BackgroundImg
            className="w-24 h-24"
            src={avatarImg.url}
            contain
          />
        ) : (
          <div className="text-center w-full">!</div>
        )}
      </button>
      <UserModal
        {...props}
        selectedUserType={selectedUserType}
        open={!!modalUserTypeOpen}
        onClose={(): void =>
          updateQuery({modalUserTypeOpen: false, userTypeId: null})
        }
        setUserTypeId={(id: string): void =>
          updateQuery({userTypeId: id})
        }
      />
    </div>
  );
};
export default UserMenu;
