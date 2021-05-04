import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Redux, {bindActionCreators} from 'redux';
import Plus from 'react-feather/dist/icons/plus';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import clsx from 'clsx';

import uniq from 'lodash/uniq';
import {motion} from 'framer-motion';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {History, Match, Img} from '~/constants/typeUtils';
import UserEnv from '~/constants/userEnvType';
import Topic from '~/constants/topicType';
// import {User} from '~/constants/userFields';
import {BlackModal, ModalBody} from '~/components/utils/Modal';

import {avatars} from '~/constants/avatars';

import * as routes from '~/constants/routeSpec';
import {CardsStateType} from '~/reducers/Cards';

import {PhotoPreview} from '~/components/utils/PhotoUpload';

import * as sessionActions from '~/reducers/Session/async_actions';
import * as cardAsyncActions from '~/reducers/Cards/async_actions';
import SelectTags from '~/components/utils/SelectTags';
import {PrevBtn, NextBtn} from './PrevNextBtn';
import styledComp from './styledComp';

import DefaultLayout from '~/components/DefaultLayout';
import TabSlider from '~/components/utils/TabSlider';

import useMergeState from '~/components/utils/useMergeState';

import buildingUrl1 from './signup_background.png';
import metroUrl from '~/styles/metro.png';
import fuseBrusselsUrl from '~/styles/FuseBrussels.png';

import validateEmail from '~/components/utils/validateEmail';

import {doReadOneEnv} from '~/firebase/db/env_db';

// import TagDetail from '~/components/utils/TagDetail';
import AppStateType from '~/reducers/appStateType';
import Loading from '~/components/utils/Loading';

const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const useScrollTo = (index: number, ref: any) => {
  useEffect(() => {
    const parentEl = ref?.current;
    if (parentEl) {
      const elements = parentEl.children;
      const el = elements[index];
      if (el) {
        const offset = el.offsetLeft;

        parentEl.scrollTo({left: offset, behavior: 'smooth'});
      }
    }
  }, [index]);
  return {ref};
};

const Alert: React.FC<any> = props => {
  const variants = {
    open: {
      y: '50vh',
      transition: {ease: 'backInOut', delay: 0.3, duration: 0.4}
    },
    closed: {
      y: '-100vh',
      transition: {ease: 'backInOut', duration: 0.4}
    }
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      {...props}
      variants={variants}
    />
  );
};

// REMOVE LATER
const rebootId = '65a5cea0-dae2-11e9-879a-c50279cf71aa';

const SignUpPage: React.FC<any> = props => {
  const {match, history} = props;
  const {params} = match;
  const {admin, userEnv: userEnvId} = params;
  const isAdmin = admin === 'admin';

  useEffect(() => {
    doReadOneEnv(userEnvId).then((env: UserEnv) => {
      if (!env) history.push(`/${rebootId}/signup`);
    });
  }, []);

  return (
    <DefaultLayout
      className=""
      navBarVisible={false}
      menu={
        <div className="absolute w-full flex justify-center">
          <h1>
            SignUp
            {admin ? ' Admin' : null}
          </h1>
        </div>
      }>
      <SignUpForm
        match={match}
        {...props}
        className="flex-grow flex flex-col"
        userEnvId={userEnvId}
        admin={isAdmin}
      />
    </DefaultLayout>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  firstName: null,
  lastName: null,
  passwordOne: '',
  passwordTwo: '',
  envIds: ['default'],
  error: null,
  img: {url: null},
  interests: [],
  loading: false,
  avatar: avatars[0].id
};

const StyledInput: React.FC<{
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  value: string;
  onChange: (event: ChangeEvent) => any;
  type: string;
  placeholder: string;
}> = ({style, className, children, ...rest}) => (
  <div className={className} style={style}>
    <input
      className="w-full form-input border-4 border-black flex-grow mb-3 "
      {...rest}
    />
  </div>
);

const FormGroup: React.FC<{
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}> = ({style, className, children}) => (
  <div
    className={`flex flex-col
      w-full px-8 py-4
      flex-wrap flex-grow flex-shrink-0 justify-start ${className}`}
    style={style}>
    {children}
  </div>
);

const prevNextClass = 'bg-white border-2 border-black w-full p-1';

const StyledPrevBtn = styledComp({
  element: PrevBtn,
  className: prevNextClass
});

const StyledNextBtn = styledComp({
  element: NextBtn,
  className: prevNextClass
});

const NameFormGroup: React.FC<{
  firstName: string;
  lastName: string;
  goNextIndex: Function;
  setUserProfile: Function;
  userEnvId: string;
}> = props => {
  const {
    firstName,
    lastName,
    goNextIndex,
    setUserProfile,
    userEnvId
  } = props;

  return (
    <FormGroup
      style={{
        backgroundImage: `url("${buildingUrl1}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
      <h1 className="mb-2">Name</h1>
      <StyledInput
        value={firstName || ''}
        onChange={(event: ChangeEvent) =>
          setUserProfile({firstName: event.target.value})
        }
        type="text"
        placeholder="First Name"
      />
      <StyledInput
        value={lastName || ''}
        onChange={(event: ChangeEvent) =>
          setUserProfile({lastName: event.target.value})
        }
        type="text"
        placeholder="Last name"
      />

      <div className="flex mt-auto">
        <Link
          className="mr-1 uppercase flex-grow p-2 bg-white font-bold border-2 border-black"
          to={`/${userEnvId}/signin`}>
          Home
        </Link>

        <StyledNextBtn className="" onClick={goNextIndex}>
          Enter Email
        </StyledNextBtn>
      </div>
    </FormGroup>
  );
};

const UserFormGroup: React.FC<{
  email: string;
  username: string;
  setUserProfile: Function;
  goPrevIndex: Function;
  goNextIndex: Function;
}> = ({email, username, setUserProfile, goPrevIndex, goNextIndex}) => (
  <FormGroup
    style={{
      backgroundImage: `url("${metroUrl}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
    <h1 className="mb-2">User</h1>
    <StyledInput
      value={username || ''}
      onChange={(event: ChangeEvent) =>
        setUserProfile({username: event.target.value})
      }
      type="text"
      placeholder="Username"
    />
    <StyledInput
      value={email || ''}
      onChange={(event: ChangeEvent) => {
        setUserProfile({email: event.target.value});
      }}
      type="email"
      placeholder="Email Address"
    />
    <div className="mt-auto w-full flex">
      <StyledPrevBtn className="flex-grow mr-2" onClick={goPrevIndex}>
        Enter Name
      </StyledPrevBtn>
      <StyledNextBtn className="flex-grow" onClick={goNextIndex}>
        Enter Password
      </StyledNextBtn>
    </div>
  </FormGroup>
);

const InterestFormGroup: React.FC<{
  setUserProfile: Function;
  topicDict: Topic[];
  interests: Topic[];
  // goNextIndex: Function;
  goPrevIndex: Function;
  isLoading: boolean;
}> = props => {
  const {
    setUserProfile,
    topicDict,
    interests,
    // goNextIndex,
    goPrevIndex,
    isLoading
  } = props;

  const tagClass =
    'p-2 text-white font-bold mb-2 mt-1 uppercase font-bold ';

  return (
    <FormGroup
      style={{
        backgroundImage: `url("${fuseBrusselsUrl}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
      <h1 className="mb-2">Interests</h1>
      <SelectTags
        btnContent={<Plus className="text-gray-600" />}
        valueAcc={(d: Topic) => d.title}
        placeholder="Select Interests"
        inputClassName="w-full form-input"
        className="border-black"
        ulClassName="h-64"
        idAcc={(d: Topic) => d.id}
        onSelect={(tag: Topic) => {
          setUserProfile({
            interests: uniq([...interests, tag])
          });
        }}
        values={topicDict}
      />
      <div className="flex my-2">
        {topicDict.slice(0, 2).map(d => (
          <div
            key={d.id}
            className={`${tagClass} text-xl bg-black mr-1`}>
            {d.title}
          </div>
        ))}
        <div key="..." className={`${tagClass} w-12 bg-black flex`}>
          <div className="m-auto">...</div>
        </div>
      </div>

      <div className="mt-auto w-full">
        <div className="flex mb-3">
          {interests.length === 0 && (
            <div
              key="no-interest"
              className={`bg-red-500 m-1 text-2xl ${tagClass}`}>
              No Interests
            </div>
          )}
          {interests.map(d => (
            <div
              key={d.id}
              className={`bg-black m-1 text-2xl ${tagClass}`}>
              {d.title}
            </div>
          ))}
        </div>
        {isLoading && (
          <Loading className="text-2xl uppercase text-white" />
        )}
        <div className="flex">
          <StyledPrevBtn
            className="flex-grow mr-2"
            onClick={goPrevIndex}>
            Enter Email
          </StyledPrevBtn>
          <StyledNextBtn type="submit" className="flex-grow">
            Sign Up
          </StyledNextBtn>
        </div>
      </div>
    </FormGroup>
  );
};

const PasswordFormGroup: React.FC<{
  passwordOne: string;
  passwordTwo: string;
  setUserProfile: Function;
  goPrevIndex: Function;
  goNextIndex: Function;
}> = props => {
  const {
    passwordOne,
    passwordTwo,
    setUserProfile,
    goPrevIndex,
    goNextIndex
  } = props;

  return (
    <FormGroup>
      <h1 className="mb-2">Password</h1>
      <StyledInput
        value={passwordOne}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setUserProfile({passwordOne: event.target.value})
        }
        type="password"
        placeholder="Password"
      />
      <StyledInput
        value={passwordTwo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setUserProfile({passwordTwo: event.target.value})
        }
        type="password"
        placeholder="Confirm Password"
      />
      <div className="flex mt-auto w-full">
        <StyledPrevBtn className="mr-2" onClick={goPrevIndex}>
          Enter Username
        </StyledPrevBtn>
        <StyledNextBtn onClick={goNextIndex}>
          Enter Interests
        </StyledNextBtn>
      </div>
    </FormGroup>
  );
};

const SlideShow: React.FC<any> = props => {
  const {avatar, updateAvatar} = props;
  const ref = React.useRef(null);
  const index = avatars.findIndex(a => avatar && a.id === avatar);
  useScrollTo(index, ref);

  // useEffect(() => {
  //   updateAvatar(avatars[index].id);
  // }, [index]);
  const disabledRight = index + 1 >= avatars.length;
  const disabledLeft = index <= 0;

  const avatarFn = (a: any, i: number) => (
    <button
      onClick={() => updateAvatar(avatars[i].id)}
      type="button"
      className={clsx(
        'cursor-pointer flex-shrink-0 flex-grow-0 w-48 h-48'
        // avatar === a.id && 'border-4 border-black '
      )}>
      <div
        className="w-full h-full"
        style={{
          background: `url(${a.img.url}) `,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
    </button>
  );
  return (
    <div className="mx-auto flex items-center overflow-hidden ">
      <button
        type="button"
        className={clsx('m-2', disabledLeft && 'disabled')}
        disabled={disabledLeft}
        onClick={() => updateAvatar(avatars[index - 1].id)}>
        <ChevronLeft size={50} />
      </button>
      <div
        ref={ref}
        className="flex w-48 relative items-center overflow-scroll ">
        {avatars.map(avatarFn)}
      </div>
      <button
        type="button"
        className={clsx('m-2', disabledRight && 'disabled')}
        disabled={disabledRight}
        onClick={() => updateAvatar(avatars[index + 1].id)}>
        <ChevronRight size={50} />
      </button>
    </div>
  );
};

const AvatarFormGroup: React.FC<{
  img: Img;
  updateAuthUser: Function;
  avatar: string;
  userProfile: User;
  setUserProfile: Function;
  onClick: Function;
}> = ({
  img,
  avatar,
  userProfile,
  setUserProfile,
  updateAuthUser,
  onClick
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const updateAvatar = av => {
    setUserProfile({avatar:av});
    updateAuthUser({...userProfile, avatar:av});
  };

  return (
    <div className="flex-grow flex flex-col my-4 mx-4 items-center overflow-y-auto">
      <div className="flex flex-grow flex-col w-full">
        <BlackModal visible={modal}>
          <ModalBody className="flex-grow" onClose={() => null}>
            <div className="flex">
              <button
                className="btn text-white bg-yellow-500 p-2 flex-grow"
                type="button"
                onClick={() => setModal(false)}>
                Back
              </button>
              <button
                className="btn text-white bg-green-500 p-2 flex-grow"
                type="button">
                Select
              </button>
            </div>
          </ModalBody>
        </BlackModal>
        <h1 className="mb-2">Avatar</h1>
        <SlideShow avatar={avatar} updateAvatar={updateAvatar} />
        <PhotoPreview
          shrinkable={false}
          edit
          className="border-2 flex-grow mb-3 md:m-6"
          style={{flexBasis: 200, maxHeight: 400}}
          url={img ? img.url : undefined}
          onChange={newImg => {
            setUserProfile({img: newImg});
          }}
        />
      </div>
      <StyledNextBtn className="mx-2 mt-auto" onClick={onClick}>
        Go!
      </StyledNextBtn>
    </div>
  );
};
const SignUpForm: React.FC<
  | {
      history: any;
      admin: boolean;
      signUp: Function;
      updateAuthUser: Function;
      userEnvId: string;
      className: string;
      fetchTopics: Function;
      topicDict: Topic[];
    }
  | any
> = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{message: string} | any>(null);
  const [visibleTabIndex, setVisibleTabIndex] = useState(0);

  const {
    history,
    admin,
    signUp,
    updateAuthUser,
    userEnvId,
    className,
    fetchTopics,
    topicDict
  } = props;

  const [userProfile, setUserProfile] = useMergeState({
    ...INITIAL_STATE,
    envIds: [userEnvId],
    admin
  });

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    img,
    avatar,
    firstName,
    lastName,
    interests
  } = userProfile;

  const access = (() => {
    // return {valid: true};
    switch (visibleTabIndex) {
      case 0: {
        if (
          firstName !== null &&
          lastName !== null &&
          firstName !== '' &&
          lastName !== ''
        ) {
          return {valid: true};
        }
        return {
          message: 'Please specifiy first and last name!',
          valid: false
        };
      }
      case 1: {
        if (username && validateEmail(email)) return {valid: true};
        return {
          message: 'Email or username are not valid',
          valid: false
        };
      }
      case 2:
        return {valid: true};
      case 3: {
        if (passwordOne === passwordTwo) return {valid: true};
        return {message: 'Password not the same', valid: false};
      }
      default:
        return {valid: false};
    }
  })();

  useEffect(() => {
    fetchTopics(userEnvId);
  }, []);

  const goNextIndex = () => {
    if (access.valid) {
      setVisibleTabIndex(Math.min(4, visibleTabIndex + 1));
      return setError(null);
    }
    return setError(access);
  };

  const goPrevIndex = () =>
    setVisibleTabIndex(Math.max(0, visibleTabIndex - 1));

  // if(!access.valid) setError(access);

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!access.valid) return setError({...access});

    setIsLoading(true);

    console.log('userProfile', userProfile);
    signUp({
      user: userProfile,
      img,
      userEnvId,
      password: passwordOne
    })
      .then(() => {
        goNextIndex();
      })
      .catch((err: {code: string}) => {
        setIsLoading(false);
        if (err.code === EMAIL_ALREADY_IN_USE) {
          setVisibleTabIndex(1);
        }

        setError(err);
      });

    event.preventDefault();
  };

  useEffect(() => {
    if (access.valid) setError(null);
  }, [access.valid]);

  return (
    <form
      onSubmit={onSubmit}
      className={`${className} flex fixed sm:relative flex-col h-full w-full overflow-hidden mb-12 md:mb-0`}>
      <Alert
        animate={error ? 'open' : 'closed'}
        className="absolute z-50 w-full flex p-4">
        <div className="m-6 alert ml-auto mr-auto font-bold bg-red-500">
          {error && error.message}
        </div>
      </Alert>
      <TabSlider
        visibleIndex={visibleTabIndex}
        className="h-full flex-shrink-0 flex-grow flex flex-col">
        <NameFormGroup
          userEnvId={userEnvId}
          firstName={firstName}
          lastName={lastName}
          setUserProfile={setUserProfile}
          goNextIndex={goNextIndex}
        />
        <UserFormGroup
          email={email}
          username={username}
          setUserProfile={setUserProfile}
          goNextIndex={goNextIndex}
          goPrevIndex={goPrevIndex}
        />
        <PasswordFormGroup
          passwordOne={passwordOne}
          passwordTwo={passwordTwo}
          goNextIndex={goNextIndex}
          goPrevIndex={goPrevIndex}
          setUserProfile={setUserProfile}
        />
        <InterestFormGroup
          isLoading={isLoading}
          topicDict={topicDict}
          interests={interests}
          goPrevIndex={goPrevIndex}
          setUserProfile={setUserProfile}
        />
        <AvatarFormGroup
          updateAuthUser={updateAuthUser}
          setUserProfile={setUserProfile}
          avatar={avatar}
          img={img}
          onClick={() => {
            history.push(`/${routes.GEO_VIEW.path}/${userEnvId}`);
          }}
        />
      </TabSlider>
    </form>
  );
};

const SignUpLink = ({userEnv}: {userEnv: string}) => (
  <div>
    <p className="mb-1">
      Do not have an account?{' '}
      <Link
        className="underline"
        to={`/${userEnv}/${routes.SIGN_UP.path}`}>
        Sign Up
      </Link>
    </p>
    <p className="">
      Or register as Admin?{' '}
      <Link
        className="underline"
        to={`/${userEnv}/${routes.SIGN_UP.path}/admin`}>
        Sign Up
      </Link>
    </p>
  </div>
);

const mapStateToProps = (state: AppStateType) => ({...state.Cards});

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): any =>
  bindActionCreators(
    {...sessionActions, ...cardAsyncActions},
    dispatch
  );

const mergeProps = (
  stateProps: CardsStateType,
  dispatchProps: any,
  ownProps: Match & History
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(SignUpPage as any);

export {SignUpForm, SignUpLink};
