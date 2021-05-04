import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';

import {addToStorage} from '~/firebase/db';
import uniq from 'lodash/uniq';

import PhotoUpload from '~/components/utils/PhotoUpload';

import DefaultLayout from '~/components/DefaultLayout';
import TabSwitcher from '~/components/utils/TabSwitcher';
import {PrevBtn, NextBtn} from '~/components/utils/PrevNextBtn';
import styledComp from '~/components/utils/styledComp';

import SelectTags from '~/components/utils/SelectTags';

const USR_IMG_PATH = 'images/usr';

export default function AccountPage(props) {
  const {
    // onClose,
    // style,
    authUser,
    // setAuthUserInfo,
    updateAuthUser
  } = props;

  const {
    uid,
    // name,
    firstName: initFirstName,
    lastName: initLastName,
    email: initEmail,
    username,
    mobileNumber: initMobileNumber,
    interests: initInterests,
    photoURL = null
  } = authUser;

  const [interests, setInterests] = useState(initInterests);
  const [firstName, setFirstName] = useState(initFirstName);
  const [lastName, setLastName] = useState(initLastName);
  const [email, setEmail] = useState(initEmail);
  const [mobileNumber, setMobileNumber] = useState(initMobileNumber);
  const [img, setImg] = useState({url: photoURL, file: null});
  const [visibleTabIndex, setVisibleTabIndex] = useState(0);

  useEffect(() => {
    if (img.file) {
      addToStorage({
        file: img.file,
        path: `${USR_IMG_PATH}/${uid}`
      }).then(imgUrl => updateAuthUser({photoURL: imgUrl}));
    }
  }, [img.url, img.file]);

  useEffect(() => {
    // TODO debounce
    updateAuthUser({firstName});
  }, [firstName]);

  useEffect(() => {
    updateAuthUser({lastName});
  }, [lastName]);

  useEffect(() => {
    updateAuthUser({interests});
  }, [interests]);

  useEffect(() => {
    updateAuthUser({mobileNumber});
  }, [mobileNumber]);

  useEffect(() => {
    updateAuthUser({email});
  }, [email]);

  const prevNextClass =
    'bg-white border-2 border-black w-full text-xl p-1';
  const StyledPrevBtn = styledComp({
    element: PrevBtn,
    className: prevNextClass
  });

  const StyledNextBtn = styledComp({
    element: NextBtn,
    className: prevNextClass
  });

  const goNextIndex = () => {
    setVisibleTabIndex(Math.min(2, visibleTabIndex + 1));
  };

  const goPrevIndex = () => {
    setVisibleTabIndex(Math.min(0, visibleTabIndex - 1));
  };

  const tabOne = (
    <>
      <section className="text-lg m-2 ml-4">
        <h2>Username:</h2>
        <input
          className="form-control w-full"
          type="text"
          defaultValue={username}
        />
      </section>
      <section className="m-2">
        <div className="flex flex-wrap">
          <div className="flex-grow ml-2">
            <h2>Email</h2>
            <input
              className="form-control w-full "
              type="text"
              defaultValue={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              disabled
              // TODO: Change auth users email -> also in firebase auth
            />
          </div>
          <div className="flex-grow flex flex-col ml-2">
            <h2>Mobilenumber:</h2>
            <input
              className="form-control w-full "
              type="text"
              defaultValue={mobileNumber}
              placeholder="Mobilenumber"
              onChange={e => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
      </section>
      <section className="m-2 ml-4">
        <div className="flex flex-wrap">
          <div className="flex-grow">
            <h2>First Name:</h2>
            <input
              className="form-control w-full"
              type="text"
              defaultValue={firstName}
              placeholder="First Name"
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex-grow flex flex-col">
            <h2>Last Name:</h2>
            <input
              className="form-control w-full"
              type="text"
              defaultValue={lastName}
              placeholder="Last Name"
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
      </section>
      <section className="text-lg m-2">
        <h2>Interests:</h2>
        <SelectTags
          placeholder="Select Interests"
          inputClassName="flex-grow p-2 border-2 border-black"
          className="flex-grow"
          idAcc={d => d.id}
          onChange={tag => setInterests(uniq([...interests, tag]))}
          values={
            // TODO
            [{id: 'sports'}, {id: 'yeah'}, {id: 'doooh'}]
          }
        />
        <div className="flex m-2">
          {interests.length === 0 && (
            <div className="tag-label bg-grey mb-1 mt-1">
              No Interests
            </div>
          )}
          {interests.map(d => (
            <div
              className="tag-label mr-1 mt-1 mb-1 bg-black cursor-pointer"
              onClick={() =>
                setInterests(interests.filter(e => e !== d))
              }>
              {d}
            </div>
          ))}
        </div>
      </section>
      <section>
        <StyledNextBtn
          onClick={() => {
            goNextIndex();
          }}>
          Image
        </StyledNextBtn>
      </section>
    </>
  );

  return (
    <DefaultLayout
      className="flex flex-col relative"
      menu={
        <div className="absolute flex justify-center w-full">
          <h1>Account</h1>
        </div>
      }>
      <div className="content-margin flex flex-col overflow-y-auto">
        <TabSwitcher
          visibleIndex={visibleTabIndex}
          className="flex-shrink-0 flex flex-col"
          tabClassName="flex-grow justify-end">
          {tabOne}
          <>
            <section className="flex flex-col mb-2">
              <h2>Photo:</h2>
              <PhotoUpload
                btnClassName="mt-2"
                imgStyle={{height: '30vh'}}
                imgUrl={img.url}
                onChange={newImg => {
                  setImg({url: newImg.url, file: newImg.file});
                }}
              />
            </section>
            <section>
              <StyledPrevBtn
                onClick={() => {
                  goPrevIndex();
                }}>
                Fields
              </StyledPrevBtn>
            </section>
          </>
        </TabSwitcher>
      </div>
    </DefaultLayout>
  );
}

/* {
  <!-- <button -->
    <!--   style={{ width: '100%' }} -->
    <!--   className={css(defaultStylesheet.btn)} -->
    <!--   onClick={() => extendUserInfo()} -->
    <!-- > -->
    <!--   <Icon.Edit /> -->
    <!-- </button> -->
  } */
