import React, {useState, useEffect} from 'react';
// import Check from 'react-feather/dist/icons/check';
import clsx from 'clsx';
import ekIconSrc from '~/styles/alphabet_icons/ic_ek.svg';
import CardDB from '~/firebase/db/card_db';
import UserEnv from '~/constants/userEnvType';
import AuthUser from '~/constants/authUserType';

import {RouterTypes} from '~/constants/typeUtils';
import ThreeDots from '~/components/utils/ThreeDots';

interface UserEnvTypes {
  userEnvs: UserEnv[];
  uid: string;
  userEnvId: string;
  authUser: AuthUser;
}

const UserEnvSelect: React.FC<RouterTypes & UserEnvTypes> = props => {
  const {userEnvs, uid, match, history, userEnvId, authUser} = props;

  const {url} = match;

  // TODO
  // For the reboot kamp Limburg (User should not see the default environment !!!!)

  const [extUserEnvs, setExtUserEnvs] = useState<UserEnv[]>(
    userEnvs || []
  );

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

  return (
    <div className="flex-grow overflow-y-auto flex flex-wrap p-1 justify-center">
      {!extUserEnvs.length && (
        <div className="m-auto">
          <ThreeDots />
      </div>)
      }
      <ul className="flex flex-col justify-start">
        {extUserEnvs.map((d: UserEnv) => (
          <li
            role="button"
            className={clsx(
              'mb-3 mr-3 flex items-center ',
              userEnvId === d.id
                ? 'border-black border-b-4 font-bold'
                : 'border-b-2'
            )}
            onClick={() => {
              // TODO
              const nurl = url.replace(`${userEnvId}`, d.id);
              history.push(nurl);
            }}>
            <div>
              <div>{d.name}</div>
            </div>
            <img
              alt="Env Img"
              className="ml-auto h-12 m-1"
              src={d.img ? d.img.url : ekIconSrc}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserEnvSelect;
