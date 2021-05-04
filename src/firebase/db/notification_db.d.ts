import Notification from '~/constants/notificationType';
export declare const doReadNotifications: (userId: string, userEnvId: string) => Promise<Notification[]>;
export declare const doMarkNotificationAsRead: (userId: string, notificationId: string) => Promise<void>;
export declare const doMarkNotificationAsSeen: (userId: string, notificationId: string) => Promise<unknown>;
export declare const doAddNotification: (userId: string, notification: Notification) => Promise<unknown>;
