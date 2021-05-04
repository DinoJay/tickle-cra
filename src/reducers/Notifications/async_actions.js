// import AppStateType from '~/reducers/appStateType';
import { fetchNotifications, addNotification, markNotificationAsRead, markNotificationAsSeen } from './actions';
import { doReadNotifications, doAddNotification, doMarkNotificationAsRead, doMarkNotificationAsSeen } from '../../firebase/db/notification_db';
import { firestore } from '~/firebase/firebase';
// type ThunkType = ThunkAction<void, AppStateType, null, Action<string>>;
export const fetchAllNotifications = (userId, envId) => function (dispatch) {
    doReadNotifications(userId, envId).then(notifications => {
        dispatch(fetchNotifications(notifications));
    });
};
export const asyncAddNotification = (userId, notification) => function (dispatch) {
    console.log('async add notification', notification);
    const { refId, refCollection, env } = notification;
    const dbRef = firestore
        .collection('card-environments')
        .doc(env)
        .collection(refCollection)
        .doc(refId);
    const newNotification = { ...notification, dbRef };
    dispatch(addNotification(newNotification));
    doAddNotification(userId, newNotification);
};
export const asyncMarkNotificationAsRead = (userId, notification) => function (dispatch) {
    dispatch(markNotificationAsRead(notification));
    doMarkNotificationAsRead(userId, notification.id);
};
export const asyncMarkNotificationAsSeen = (userId, notification) => function (dispatch) {
    dispatch(markNotificationAsSeen(notification));
    doMarkNotificationAsSeen(userId, notification.id);
};
