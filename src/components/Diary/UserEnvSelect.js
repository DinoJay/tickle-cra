import React, { useState } from 'react';
// import Check from 'react-feather/dist/icons/check';
import clsx from 'clsx';
import ekIconSrc from '~/styles/alphabet_icons/ic_ek.svg';
import ThreeDots from '~/components/utils/ThreeDots';
const UserEnvSelect = props => {
    const { userEnvs, uid, match, history, userEnvId, authUser } = props;
    const { url } = match;
    // TODO
    // For the reboot kamp Limburg (User should not see the default environment !!!!)
    const [extUserEnvs, setExtUserEnvs] = useState(userEnvs || []);
    // useEffect(() => {
    //   Promise.all(
    //     filteredUserEnvs.map(u => {
    //       const db = CardDB(u.id);
    //       return db
    //         .doReadCardsWithSubmission(uid)
    //         .then((envCards: Card) => ({...u, cards: envCards}));
    //     })
    //   ).then(setExtUserEnvs);
    // }, []);
    return (React.createElement("div", { className: "flex-grow overflow-y-auto flex flex-wrap p-1 justify-center" },
        !extUserEnvs.length && (React.createElement("div", { className: "m-auto" },
            React.createElement(ThreeDots, null))),
        React.createElement("ul", { className: "flex flex-col justify-start" }, extUserEnvs.map((d) => (React.createElement("li", { role: "button", className: clsx('mb-3 mr-3 flex items-center ', userEnvId === d.id
                ? 'border-black border-b-4 font-bold'
                : 'border-b-2'), onClick: () => {
                // TODO
                const nurl = url.replace(`${userEnvId}`, d.id);
                history.push(nurl);
            } },
            React.createElement("div", null,
                React.createElement("div", null, d.name)),
            React.createElement("img", { alt: "Env Img", className: "ml-auto h-12 m-1", src: d.img ? d.img.url : ekIconSrc })))))));
};
export default UserEnvSelect;
