import { NotificationActionTypes } from './types';
import Notification from '~/constants/notificationType';
export interface NotificationsStateType {
    notifications: Notification[];
}
export default function reducer(state: NotificationsStateType | undefined, action: NotificationActionTypes): NotificationsStateType;
