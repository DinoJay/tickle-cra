import {
  QuerySnapshot,
  DocumentSnapshot
  // DocumentData
} from '@firebase/firestore-types';

import {firestore, Timestamp} from '../firebase';

import Notification from '~/constants/notificationType';

export const doReadNotifications = (
  userId: string,
  userEnvId: string
): Promise<Notification[]> => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .where('env', '==', userEnvId)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map((notificationDoc: DocumentSnapshot) => ({
        ...notificationDoc.data(),
        id: notificationDoc.id
      }))
    );
};

export const doMarkNotificationAsRead = (
  userId: string,
  notificationId: string
): Promise<void> =>
  firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notificationId)
    .set(
      {
        read: true
      },
      {merge: true}
    );

export const doMarkNotificationAsSeen = (
  userId: string,
  notificationId: string
): Promise<unknown> =>
  firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notificationId)
    .set(
      {
        shown: true
      },
      {merge: true}
    );

export const doAddNotification = (
  userId: string,
  notification: Notification
): Promise<unknown> =>
 firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notification.id)
    .set({
      ...notification,
      created: Timestamp.now()
    });
