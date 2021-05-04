import React from 'react';

import {Card} from '~/constants/cardFields';
import CardFrame from '../CardFrame';
import EditCardFront from '~/components/cards/CardFront/EditCardFront';
import UserSubmissionsCardBack from './UserSubmissionCardBack';
import AuthUser from '~/constants/authUserType';

// import Activity from '~/constants/activityType';
// import ActivitySubmission from '~/constants/activitySubmissionType';

interface ReviewCardType extends Card {
  id: string;
  flipped: boolean;
  authUser: AuthUser;
  routeToggleExtend: Function;
  removeCard: (a: string) => any;
  createCard: (c: Card) => any;
  toggleUserview: Function;
  onCardUpdate: (c: Card) => any;
  asyncRemoveActivitySub: Function;
  userEnvId:string;
  // activity: Activity;
  // allActivitySubs: ActivitySubmission[];
}
const ReviewCard: React.FC<ReviewCardType> = props => {
  const {
    flipped,
    id,
    onClose,
    onFlip,
    authUser,
    allActivitySubs,
    activity,
    routeToggleExtend,
    removeCard,
    createCard,
    onCardUpdate,
    toggleUserview
  } = props;

  if (!activity) return <div>Error no activity</div>;

  return (
    <CardFrame
      key={id}
      flipped={flipped}
      className="flex flex-col flex-grow"
      front={
        <EditCardFront
          removable={false}
          {...props}
          toggleUserview={toggleUserview}
          onClose={() => {
            routeToggleExtend();
          }}
          onFlip={onFlip}
          onRemove={() => {
            routeToggleExtend();
            removeCard(props.id);
          }}
          onCreate={(d: Card) => {
            routeToggleExtend();
            createCard({...d});
          }}
          onUpdate={(d: Card) => {
            onCardUpdate({...d});
          }}
        />
      }
      back={
        <UserSubmissionsCardBack
          onFlip={onFlip}
          onClose={onClose}
          allActivitySubs={allActivitySubs || []}
          authUser={authUser}
          activity={activity}
          {...props}
        />
      }
    />
  );
};

export default ReviewCard;
