import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Plus from 'react-feather/dist/icons/plus';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import clsx from 'clsx';
import uniq from 'lodash/uniq';
import { motion } from 'framer-motion';
import { compose } from 'recompose';
import { connect } from 'react-redux';
// import {User} from '~/constants/userFields';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import { avatars } from '~/constants/avatars';
import * as routes from '~/constants/routeSpec';
import { PhotoPreview } from '~/components/utils/PhotoUpload';
import * as sessionActions from '~/reducers/Session/async_actions';
import * as cardAsyncActions from '~/reducers/Cards/async_actions';
import SelectTags from '~/components/utils/SelectTags';
import { PrevBtn, NextBtn } from './PrevNextBtn';
import styledComp from './styledComp';
import DefaultLayout from '~/components/DefaultLayout';
import TabSlider from '~/components/utils/TabSlider';
import useMergeState from '~/components/utils/useMergeState';
import buildingUrl1 from './signup_background.png';
import metroUrl from '~/styles/metro.png';
import fuseBrusselsUrl from '~/styles/FuseBrussels.png';
import validateEmail from '~/components/utils/validateEmail';
import { doReadOneEnv } from '~/firebase/db/env_db';
import Loading from '~/components/utils/Loading';
const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
const useScrollTo = (index, ref) => {
    useEffect(() => {
        var _a;
        const parentEl = (_a = ref) === null || _a === void 0 ? void 0 : _a.current;
        if (parentEl) {
            const elements = parentEl.children;
            const el = elements[index];
            if (el) {
                const offset = el.offsetLeft;
                parentEl.scrollTo({ left: offset, behavior: 'smooth' });
            }
        }
    }, [index]);
    return { ref };
};
const Alert = props => {
    const variants = {
        open: {
            y: '50vh',
            transition: { ease: 'backInOut', delay: 0.3, duration: 0.4 }
        },
        closed: {
            y: '-100vh',
            transition: { ease: 'backInOut', duration: 0.4 }
        }
    };
    return (React.createElement(motion.div, Object.assign({ initial: "closed", animate: "open" }, props, { variants: variants })));
};
// REMOVE LATER
const rebootId = '65a5cea0-dae2-11e9-879a-c50279cf71aa';
const SignUpPage = props => {
    const { match, history } = props;
    const { params } = match;
    const { admin, userEnv: userEnvId } = params;
    const isAdmin = admin === 'admin';
    useEffect(() => {
        doReadOneEnv(userEnvId).then((env) => {
            if (!env)
                history.push(`/${rebootId}/signup`);
        });
    }, []);
    return (React.createElement(DefaultLayout, { className: "", navBarVisible: false, menu: React.createElement("div", { className: "absolute w-full flex justify-center" },
            React.createElement("h1", null,
                "SignUp",
                admin ? ' Admin' : null)) },
        React.createElement(SignUpForm, Object.assign({ match: match }, props, { className: "flex-grow flex flex-col", userEnvId: userEnvId, admin: isAdmin }))));
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
    img: { url: null },
    interests: [],
    loading: false,
    avatar: avatars[0].id
};
const StyledInput = ({ style, className, children, ...rest }) => (React.createElement("div", { className: className, style: style },
    React.createElement("input", Object.assign({ className: "w-full form-input border-4 border-black flex-grow mb-3 " }, rest))));
const FormGroup = ({ style, className, children }) => (React.createElement("div", { className: `flex flex-col
      w-full px-8 py-4
      flex-wrap flex-grow flex-shrink-0 justify-start ${className}`, style: style }, children));
const prevNextClass = 'bg-white border-2 border-black w-full p-1';
const StyledPrevBtn = styledComp({
    element: PrevBtn,
    className: prevNextClass
});
const StyledNextBtn = styledComp({
    element: NextBtn,
    className: prevNextClass
});
const NameFormGroup = props => {
    const { firstName, lastName, goNextIndex, setUserProfile, userEnvId } = props;
    return (React.createElement(FormGroup, { style: {
            backgroundImage: `url("${buildingUrl1}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        } },
        React.createElement("h1", { className: "mb-2" }, "Name"),
        React.createElement(StyledInput, { value: firstName || '', onChange: (event) => setUserProfile({ firstName: event.target.value }), type: "text", placeholder: "First Name" }),
        React.createElement(StyledInput, { value: lastName || '', onChange: (event) => setUserProfile({ lastName: event.target.value }), type: "text", placeholder: "Last name" }),
        React.createElement("div", { className: "flex mt-auto" },
            React.createElement(Link, { className: "mr-1 uppercase flex-grow p-2 bg-white font-bold border-2 border-black", to: `/${userEnvId}/signin` }, "Home"),
            React.createElement(StyledNextBtn, { className: "", onClick: goNextIndex }, "Enter Email"))));
};
const UserFormGroup = ({ email, username, setUserProfile, goPrevIndex, goNextIndex }) => (React.createElement(FormGroup, { style: {
        backgroundImage: `url("${metroUrl}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    } },
    React.createElement("h1", { className: "mb-2" }, "User"),
    React.createElement(StyledInput, { value: username || '', onChange: (event) => setUserProfile({ username: event.target.value }), type: "text", placeholder: "Username" }),
    React.createElement(StyledInput, { value: email || '', onChange: (event) => {
            setUserProfile({ email: event.target.value });
        }, type: "email", placeholder: "Email Address" }),
    React.createElement("div", { className: "mt-auto w-full flex" },
        React.createElement(StyledPrevBtn, { className: "flex-grow mr-2", onClick: goPrevIndex }, "Enter Name"),
        React.createElement(StyledNextBtn, { className: "flex-grow", onClick: goNextIndex }, "Enter Password"))));
const InterestFormGroup = props => {
    const { setUserProfile, topicDict, interests, 
    // goNextIndex,
    goPrevIndex, isLoading } = props;
    const tagClass = 'p-2 text-white font-bold mb-2 mt-1 uppercase font-bold ';
    return (React.createElement(FormGroup, { style: {
            backgroundImage: `url("${fuseBrusselsUrl}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        } },
        React.createElement("h1", { className: "mb-2" }, "Interests"),
        React.createElement(SelectTags, { btnContent: React.createElement(Plus, { className: "text-gray-600" }), valueAcc: (d) => d.title, placeholder: "Select Interests", inputClassName: "w-full form-input", className: "border-black", ulClassName: "h-64", idAcc: (d) => d.id, onSelect: (tag) => {
                setUserProfile({
                    interests: uniq([...interests, tag])
                });
            }, values: topicDict }),
        React.createElement("div", { className: "flex my-2" },
            topicDict.slice(0, 2).map(d => (React.createElement("div", { key: d.id, className: `${tagClass} text-xl bg-black mr-1` }, d.title))),
            React.createElement("div", { key: "...", className: `${tagClass} w-12 bg-black flex` },
                React.createElement("div", { className: "m-auto" }, "..."))),
        React.createElement("div", { className: "mt-auto w-full" },
            React.createElement("div", { className: "flex mb-3" },
                interests.length === 0 && (React.createElement("div", { key: "no-interest", className: `bg-red-500 m-1 text-2xl ${tagClass}` }, "No Interests")),
                interests.map(d => (React.createElement("div", { key: d.id, className: `bg-black m-1 text-2xl ${tagClass}` }, d.title)))),
            isLoading && (React.createElement(Loading, { className: "text-2xl uppercase text-white" })),
            React.createElement("div", { className: "flex" },
                React.createElement(StyledPrevBtn, { className: "flex-grow mr-2", onClick: goPrevIndex }, "Enter Email"),
                React.createElement(StyledNextBtn, { type: "submit", className: "flex-grow" }, "Sign Up")))));
};
const PasswordFormGroup = props => {
    const { passwordOne, passwordTwo, setUserProfile, goPrevIndex, goNextIndex } = props;
    return (React.createElement(FormGroup, null,
        React.createElement("h1", { className: "mb-2" }, "Password"),
        React.createElement(StyledInput, { value: passwordOne, onChange: (event) => setUserProfile({ passwordOne: event.target.value }), type: "password", placeholder: "Password" }),
        React.createElement(StyledInput, { value: passwordTwo, onChange: (event) => setUserProfile({ passwordTwo: event.target.value }), type: "password", placeholder: "Confirm Password" }),
        React.createElement("div", { className: "flex mt-auto w-full" },
            React.createElement(StyledPrevBtn, { className: "mr-2", onClick: goPrevIndex }, "Enter Username"),
            React.createElement(StyledNextBtn, { onClick: goNextIndex }, "Enter Interests"))));
};
const SlideShow = props => {
    const { avatar, updateAvatar } = props;
    const ref = React.useRef(null);
    const index = avatars.findIndex(a => avatar && a.id === avatar);
    useScrollTo(index, ref);
    // useEffect(() => {
    //   updateAvatar(avatars[index].id);
    // }, [index]);
    const disabledRight = index + 1 >= avatars.length;
    const disabledLeft = index <= 0;
    const avatarFn = (a, i) => (React.createElement("button", { onClick: () => updateAvatar(avatars[i].id), type: "button", className: clsx('cursor-pointer flex-shrink-0 flex-grow-0 w-48 h-48'
        // avatar === a.id && 'border-4 border-black '
        ) },
        React.createElement("div", { className: "w-full h-full", style: {
                background: `url(${a.img.url}) `,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            } })));
    return (React.createElement("div", { className: "mx-auto flex items-center overflow-hidden " },
        React.createElement("button", { type: "button", className: clsx('m-2', disabledLeft && 'disabled'), disabled: disabledLeft, onClick: () => updateAvatar(avatars[index - 1].id) },
            React.createElement(ChevronLeft, { size: 50 })),
        React.createElement("div", { ref: ref, className: "flex w-48 relative items-center overflow-scroll " }, avatars.map(avatarFn)),
        React.createElement("button", { type: "button", className: clsx('m-2', disabledRight && 'disabled'), disabled: disabledRight, onClick: () => updateAvatar(avatars[index + 1].id) },
            React.createElement(ChevronRight, { size: 50 }))));
};
const AvatarFormGroup = ({ img, avatar, userProfile, setUserProfile, updateAuthUser, onClick }) => {
    const [modal, setModal] = useState(false);
    const updateAvatar = av => {
        setUserProfile({ avatar: av });
        updateAuthUser({ ...userProfile, avatar: av });
    };
    return (React.createElement("div", { className: "flex-grow flex flex-col my-4 mx-4 items-center overflow-y-auto" },
        React.createElement("div", { className: "flex flex-grow flex-col w-full" },
            React.createElement(BlackModal, { visible: modal },
                React.createElement(ModalBody, { className: "flex-grow", onClose: () => null },
                    React.createElement("div", { className: "flex" },
                        React.createElement("button", { className: "btn text-white bg-yellow-500 p-2 flex-grow", type: "button", onClick: () => setModal(false) }, "Back"),
                        React.createElement("button", { className: "btn text-white bg-green-500 p-2 flex-grow", type: "button" }, "Select")))),
            React.createElement("h1", { className: "mb-2" }, "Avatar"),
            React.createElement(SlideShow, { avatar: avatar, updateAvatar: updateAvatar }),
            React.createElement(PhotoPreview, { shrinkable: false, edit: true, className: "border-2 flex-grow mb-3 md:m-6", style: { flexBasis: 200, maxHeight: 400 }, url: img ? img.url : undefined, onChange: newImg => {
                    setUserProfile({ img: newImg });
                } })),
        React.createElement(StyledNextBtn, { className: "mx-2 mt-auto", onClick: onClick }, "Go!")));
};
const SignUpForm = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visibleTabIndex, setVisibleTabIndex] = useState(0);
    const { history, admin, signUp, updateAuthUser, userEnvId, className, fetchTopics, topicDict } = props;
    const [userProfile, setUserProfile] = useMergeState({
        ...INITIAL_STATE,
        envIds: [userEnvId],
        admin
    });
    const { username, email, passwordOne, passwordTwo, img, avatar, firstName, lastName, interests } = userProfile;
    const access = (() => {
        // return {valid: true};
        switch (visibleTabIndex) {
            case 0: {
                if (firstName !== null &&
                    lastName !== null &&
                    firstName !== '' &&
                    lastName !== '') {
                    return { valid: true };
                }
                return {
                    message: 'Please specifiy first and last name!',
                    valid: false
                };
            }
            case 1: {
                if (username && validateEmail(email))
                    return { valid: true };
                return {
                    message: 'Email or username are not valid',
                    valid: false
                };
            }
            case 2:
                return { valid: true };
            case 3: {
                if (passwordOne === passwordTwo)
                    return { valid: true };
                return { message: 'Password not the same', valid: false };
            }
            default:
                return { valid: false };
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
    const goPrevIndex = () => setVisibleTabIndex(Math.max(0, visibleTabIndex - 1));
    // if(!access.valid) setError(access);
    const onSubmit = (event) => {
        event.preventDefault();
        if (!access.valid)
            return setError({ ...access });
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
            .catch((err) => {
            setIsLoading(false);
            if (err.code === EMAIL_ALREADY_IN_USE) {
                setVisibleTabIndex(1);
            }
            setError(err);
        });
        event.preventDefault();
    };
    useEffect(() => {
        if (access.valid)
            setError(null);
    }, [access.valid]);
    return (React.createElement("form", { onSubmit: onSubmit, className: `${className} flex fixed sm:relative flex-col h-full w-full overflow-hidden mb-12 md:mb-0` },
        React.createElement(Alert, { animate: error ? 'open' : 'closed', className: "absolute z-50 w-full flex p-4" },
            React.createElement("div", { className: "m-6 alert ml-auto mr-auto font-bold bg-red-500" }, error && error.message)),
        React.createElement(TabSlider, { visibleIndex: visibleTabIndex, className: "h-full flex-shrink-0 flex-grow flex flex-col" },
            React.createElement(NameFormGroup, { userEnvId: userEnvId, firstName: firstName, lastName: lastName, setUserProfile: setUserProfile, goNextIndex: goNextIndex }),
            React.createElement(UserFormGroup, { email: email, username: username, setUserProfile: setUserProfile, goNextIndex: goNextIndex, goPrevIndex: goPrevIndex }),
            React.createElement(PasswordFormGroup, { passwordOne: passwordOne, passwordTwo: passwordTwo, goNextIndex: goNextIndex, goPrevIndex: goPrevIndex, setUserProfile: setUserProfile }),
            React.createElement(InterestFormGroup, { isLoading: isLoading, topicDict: topicDict, interests: interests, goPrevIndex: goPrevIndex, setUserProfile: setUserProfile }),
            React.createElement(AvatarFormGroup, { updateAuthUser: updateAuthUser, setUserProfile: setUserProfile, avatar: avatar, img: img, onClick: () => {
                    history.push(`/${routes.GEO_VIEW.path}/${userEnvId}`);
                } }))));
};
const SignUpLink = ({ userEnv }) => (React.createElement("div", null,
    React.createElement("p", { className: "mb-1" },
        "Do not have an account?",
        ' ',
        React.createElement(Link, { className: "underline", to: `/${userEnv}/${routes.SIGN_UP.path}` }, "Sign Up")),
    React.createElement("p", { className: "" },
        "Or register as Admin?",
        ' ',
        React.createElement(Link, { className: "underline", to: `/${userEnv}/${routes.SIGN_UP.path}/admin` }, "Sign Up"))));
const mapStateToProps = (state) => ({ ...state.Cards });
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...sessionActions, ...cardAsyncActions }, dispatch);
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps, mergeProps))(SignUpPage);
export { SignUpForm, SignUpLink };
