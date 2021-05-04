import React, {useEffect, useState} from 'react';
import sortBy from 'lodash/sortBy';
import clsx from 'clsx';
import {avatarUrls} from '~/constants/avatars';

// import {wrapGrid} from 'animate-css-grid';

// import menuIconSrc from '~/styles/menu_icons/menuIconStolen.svg';

// import PreviewCard from '~/components/cards/PreviewCard';
// import ConnectedCard from '~/components/cards/ConnectedCard';

// import {BlackModal} from '~/components/utils/Modal';
// import DefaultLayout from '~/components/DefaultLayout';

// import SlideMenu from '~/components/utils/SlideMenu';

import {User} from '~/constants/userFields';
import {Card} from '~/constants/cardFields';
import calcPoints from '~/components/utils/calcPoints';

/**
 * This Component displays all the cards the use has interfaced with.
 * This means submitted, rated, and bookmarked cards
 * TODO: filter options and testing in general
 * @param {cards} user cards
 */

import CardDB from '~/firebase/db/card_db';
import ActivitySubmission from '~/constants/activitySubmissionType';

const readCardsWithSubmission = (userEnvId: string) => {
  const db = CardDB(userEnvId);
  return db
    .doReadCards()
    .then(
      (data: Card[]): Promise<Card[]> =>
        Promise.all(
          data.map(
            (d: Card): Promise<Card> =>
              db
                .doReadSubmissions(d.id)
                .then(
                  (allActivitySubs: ActivitySubmission[]) =>
                    ({...d, allActivitySubs} as Card)
                )
          )
        )
    );
};

const UserCollapsible: React.FC<any> = props => {
  const {user, points, allPoints} = props;
  const [ext, setExt] = useState<boolean>(false);
  return (
    <div className="border-b-2 w-full mb-2" key={user.uid}>
      <div className="flex">
        <div className="flex flex-grow relative">
          <div className="flex p-1 items-center w-full">
            <div className="flex items-center">
              <img
                className="h-12 w-12 mr-2"
                alt="avatar"
                src={avatarUrls[user.avatar] || avatarUrls.user1}
              />
              <div className="truncate text-xl">{user.username}</div>
            </div>
            <div className="ml-auto text-2xl">{points}XP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderBoard: React.FC<{
  fetchUsers: Function;
  users: User[];
  cards: Card[];
  userEnvId: string;
  fetchAllCardsWithSubmissions: (env: string) => any;
}> = props => {
  const {fetchUsers, userEnvId, users = []} = props;

  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetchUsers(userEnvId);
    readCardsWithSubmission(userEnvId).then(setCards);
  }, [userEnvId]);

  const userAndPoints = users
    .map(u => ({
      user: u,
      cards: cards.filter(
        (c: Card) =>
          c.allActivitySubs &&
          c.allActivitySubs
            .filter(d => d.succeeded)
            .map(s => s.uid)
            .includes(u.uid)
      )
    }))
    .map(d => ({...d, points: calcPoints(d.cards)}));

  const allPoints = calcPoints(cards);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col flex-grow">
        {sortBy(userAndPoints, 'points')
          .reverse()
          .map(({user, points}) => (
            <UserCollapsible
              user={user}
              points={points}
              allPoints={allPoints}
            />
          ))}
      </div>
    </div>
  );
};
export default LeaderBoard;
