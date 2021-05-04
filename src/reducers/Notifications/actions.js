import { FETCH_NOTIFICATIONS, ADD_NOTIFICATION, MARK_NOTIFICATION_AS_READ, MARK_NOTIFICATION_AS_SEEN, REMOVE_NOTIFICATIONS } from './types';
export function fetchNotifications(options) {
    return { type: FETCH_NOTIFICATIONS, options };
}
export function addNotification(options) {
    return { type: ADD_NOTIFICATION, options };
}
export function markNotificationAsRead(options) {
    return { type: MARK_NOTIFICATION_AS_READ, options };
}
export function markNotificationAsSeen(options) {
    return { type: MARK_NOTIFICATION_AS_SEEN, options };
}
export function removeNotifications(options) {
    return { type: REMOVE_NOTIFICATIONS, options };
}
