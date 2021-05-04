// import {ThunkAction} from 'redux-thunk';
// import {Action} from 'redux';
import Notification from '~/constants/notificationType';
// import AppStateType from '~/reducers/appStateType';
import {
  fetchNotifications,
  addNotification,
  markNotificationAsRead,
  markNotificationAsSeen
} from './actions';

import {
  doReadNotifications,
  doAddNotification,
  doMarkNotificationAsRead,
  doMarkNotificationAsSeen
} from '../../firebase/db/notification_db';

import {firestore} from '~/firebase/firebase';

// type ThunkType = ThunkAction<void, AppStateType, null, Action<string>>;

export const fetchAllNotifications = (userId: string, envId: string) =>
  function(dispatch: Function) {
    doReadNotifications(userId, envId).then(notifications => {
      dispatch(fetchNotifications(notifications));
    });
  };

export const asyncAddNotification = (
  userId: string,
  notification: Notification
) =>
  function(dispatch: Function) {
    console.log('async add notification', notification);
    const {refId, refCollection, env} = notification;

    const dbRef = firestore
      .collection('card-environments')
      .doc(env)
      .collection(refCollection)
      .doc(refId);

    const newNotification = {...notification, dbRef};
    dispatch(addNotification(newNotification));
    doAddNotification(userId, newNotification);
  };

export const asyncMarkNotificationAsRead = (
  userId: string,
  notification: Notification
) =>
  function(dispatch: Function) {
    dispatch(markNotificationAsRead(notification));
    doMarkNotificationAsRead(userId, notification.id);
  };

export const asyncMarkNotificationAsSeen = (
  userId: string,
  notification: Notification
) =>
  function(dispatch: Function) {
    dispatch(markNotificationAsSeen(notification));
    doMarkNotificationAsSeen(userId, notification.id);
  };
