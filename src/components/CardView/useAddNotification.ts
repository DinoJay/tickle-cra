import {useEffect} from 'react';
import AuthUser from '~/constants/authUserType';
import {Card} from '~/constants/cardFields';
import calcDist from './calcDist';
import {Timestamp} from '~/firebase/firebase';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import Notification from '~/constants/notificationType';

import {LngLat} from '~/constants/typeUtils';

// const filterCardsOnTime = (card: Card) => {
//   const parseTime = timeParse('%Y-%m-%dT%H:%M');
//
//   // If card has a timeRange
//   if (card.loc.value.startDateTime || card.loc.value.endDateTime) {
//     const parsedStartTime = parseTime(card.loc.value.startDateTime);
//     const parsedEndTime = parseTime(card.loc.value.endDateTime);
//     const now = new Date(); // Date.now();
//
//     const inTime =
//       parsedStartTime &&
//       parsedEndTime &&
//       now >= parsedStartTime &&
//       now <= parsedEndTime;
//
//     return inTime;
//   }
//   return true;
// };

const filterCardsOnDistance = (card: Card, userLoc: LngLat) => {
  const distance = calcDist(card, userLoc);

  const radius =
    card.loc.value.radius && typeof card.loc.value.radius === 'number'
      ? card.loc.value.radius
      : Infinity;

  const inRange = distance <= radius;
  return inRange;
};

const useAddNotification = ({
  cards,
  notifications,
  userLocation,
  authUser,
  userEnvId,
  asyncAddNotification
}: {
  cards: Card[];
  notifications: Notification[];
  userLocation: LngLat;
  authUser: AuthUser;
  userEnvId: string;
  asyncAddNotification: (uid: string, not: Notification) => any;
}) => {
  const cardsInRange = cards

    // .filter((scard: Card) => filterCardsOnTime(scard))
    .filter((scard: Card) => filterCardsOnDistance(scard, userLocation))
    .map((c: Card) => ({...c, distance: calcDist(c, userLocation)}));
  // .filter(c => !c.activitySubmission)
  // .sort((a, b) => a.distance > b.distance);

  const cardsInRangeIds = cardsInRange.map((c: Card) => c.id);

  useEffect(() => {
    // TODO:make cleaner
    const cardNotifications = cardsInRange.filter(
      (c: Card) =>
        !notifications
          .map((n: Notification) => n.id)
          .includes(`${c.id}_cards`)
    );

    cardNotifications.forEach((dc: Card) =>
      asyncAddNotification(authUser.uid, {
        id: `${dc.id}_cards`,
        cardId: dc.id!,
        refId: dc.id,
        refCollection: 'cards',
        created: Timestamp.now(),
        title: (dc.value && dc.value.title) || 'card with no title',
        meta: `${calcDist(
          cards.find((c: Card) => c.id === dc.id)!,
          userLocation
        )} m`,
        message:
          'Deze kaart kan verzameld worden. Doe de uitdaging om deze kaart te verzamelen.',
        shown: false,
        read: false,
        env: userEnvId
      })
    );
  }, [useDeepCompareMemoize({cardsInRangeIds})]);
};
export default useAddNotification;
