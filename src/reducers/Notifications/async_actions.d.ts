import Notification from '~/constants/notificationType';
export declare const fetchAllNotifications: (userId: string, envId: string) => (dispatch: Function) => void;
export declare const asyncAddNotification: (userId: string, notification: Notification) => (dispatch: Function) => void;
export declare const asyncMarkNotificationAsRead: (userId: string, notification: Notification) => (dispatch: Function) => void;
export declare const asyncMarkNotificationAsSeen: (userId: string, notification: Notification) => (dispatch: Function) => void;
