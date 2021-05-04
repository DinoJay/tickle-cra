import {
  FETCH_NOTIFICATIONS,
  ADD_NOTIFICATION,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_SEEN,
  REMOVE_NOTIFICATIONS,
  NotificationActionTypes
} from './types';

export function fetchNotifications(
  options: any
): NotificationActionTypes {
  return {type: FETCH_NOTIFICATIONS, options};
}

export function addNotification(options: any): NotificationActionTypes {
  return {type: ADD_NOTIFICATION, options};
}

export function markNotificationAsRead(
  options: any
): NotificationActionTypes {
  return {type: MARK_NOTIFICATION_AS_READ, options};
}

export function markNotificationAsSeen(
  options: any
): NotificationActionTypes {
  return {type: MARK_NOTIFICATION_AS_SEEN, options};
}

export function removeNotifications(
  options: any
): NotificationActionTypes {
  return {type: REMOVE_NOTIFICATIONS, options};
}
