export const FETCH_NOTIFICATIONS = 'READ_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const MARK_NOTIFICATION_AS_READ = 'MARK_NOTIFICATION_AS_READ';
export const MARK_NOTIFICATION_AS_SEEN = 'MARK_NOTIFICATION_AS_SEEN';
export const REMOVE_NOTIFICATIONS = 'REMOVE_NOTIFICATIONS';

export interface FetchNotifications {
  type: typeof FETCH_NOTIFICATIONS;
  options: any;
}

export interface AddNotification {
  type: typeof ADD_NOTIFICATION;
  options: any;
}

export interface MarkNotificationAsRead {
  type: typeof MARK_NOTIFICATION_AS_READ;
  options: any;
}

export interface MarkNotificationAsSeen {
  type: typeof MARK_NOTIFICATION_AS_SEEN;
  options: any;
}

export interface RemoveNotifications {
  type: typeof REMOVE_NOTIFICATIONS;
  options: any;
}

export type NotificationActionTypes =
  | FetchNotifications
  | AddNotification
  | MarkNotificationAsRead
  | MarkNotificationAsSeen
  | RemoveNotifications;
