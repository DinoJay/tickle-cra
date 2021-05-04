import { firestore, Timestamp } from '../firebase';
export const doReadNotifications = (userId, userEnvId) => {
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
        .then((querySnapshot) => querySnapshot.docs.map((notificationDoc) => ({
        ...notificationDoc.data(),
        id: notificationDoc.id
    })));
};
export const doMarkNotificationAsRead = (userId, notificationId) => firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notificationId)
    .set({
    read: true
}, { merge: true });
export const doMarkNotificationAsSeen = (userId, notificationId) => firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notificationId)
    .set({
    shown: true
}, { merge: true });
export const doAddNotification = (userId, notification) => firestore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .doc(notification.id)
    .set({
    ...notification,
    created: Timestamp.now()
});
