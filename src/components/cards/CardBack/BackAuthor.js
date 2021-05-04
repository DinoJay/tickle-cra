import React, { useEffect, useState } from 'react';
import PreviewCard from '~/components/cards/PreviewCard';
import makeAbort from '~/components/utils/abortPromise';
import { doReadDetailUser } from '~/firebase/db/user_db';
/**
 * Component for author profile on the back of the card
 */
const AuthorDetails = ({ style, // skills,
className, createdCards }) => (React.createElement("div", { className: `${className} flex flex-col`, style: { ...style } },
    React.createElement("div", { className: "flex-shrink-0 mb-3" },
        React.createElement("h2", { className: "mb-1" }, "Top Interests"),
        React.createElement("div", { className: "flex w-full flex-wrap" }, ['football', 'sports'].map(d => (React.createElement("div", { className: "text-xl capitalize bg-black tag-label\n              bg-black m-1" }, d))))),
    React.createElement("h2", { className: "mb-1" }, "Top Cards"),
    React.createElement("div", { className: "flex flex-wrap relative", style: {} }, createdCards.slice(0, 4).map((d) => (React.createElement(PreviewCard, { title: (d.title && d.title.value) || undefined, img: (d.img && d.img.value) || undefined, className: "m-1 p-2", style: { flex: '0 0 100px', height: 130 } }))))));
const AuthorPreview = props => {
    const { className, img, style, username } = props;
    return (React.createElement("div", { className: className, style: {
            ...style
        } },
        React.createElement("img", { className: "absolute h-full w-full", src: img && img.url, alt: "alt", style: { objectFit: 'cover' } }),
        React.createElement("div", { className: "absolute m-3" },
            React.createElement("h2", { className: "tag-label bg-black" }, username))));
};
const BackAuthor = props => {
    const { extended, style, userInfo } = props;
    const { createdCards = null, collectedCards = null, img = null, username = null } = userInfo || {};
    const info = createdCards && collectedCards && img && username && (React.createElement(React.Fragment, null,
        React.createElement(AuthorPreview, { img: img, username: username, className: "flex flex-col relative flex-shrink-0", style: { flexGrow: 10 } }),
        extended && (React.createElement(AuthorDetails, { className: "flex-grow flex flex-col relative p-1", createdCards: createdCards, collectedCards: collectedCards }))));
    return (React.createElement("div", { className: "flex flex-grow flex-col justify-center overflow-y-auto", style: style }, info));
};
/**
 * Component to wrap data fetching for author profile
 */
const BackAuthorWrapper = props => {
    const { uid, extended, style } = props;
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const authorDataPromise = makeAbort(doReadDetailUser(uid).then(authorInfo => {
            setUserInfo(authorInfo);
        }));
        return () => authorDataPromise.cancel();
    }, []);
    return (React.createElement(BackAuthor, { extended: extended, userInfo: userInfo, style: style }));
};
export default BackAuthorWrapper;
