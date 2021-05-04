import uniqBy from 'lodash/uniqBy';
import { FETCH_NOTIFICATIONS, ADD_NOTIFICATION, MARK_NOTIFICATION_AS_READ, MARK_NOTIFICATION_AS_SEEN, REMOVE_NOTIFICATIONS } from './types';
const INITIAL_STATE = {
    notifications: []
};
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS: {
            const notifications = action.options;
            return {
                notifications
            };
        }
        case ADD_NOTIFICATION: {
            const notification = action.options;
            return {
                notifications: uniqBy([...state.notifications, notification], 'id')
            };
        }
        case MARK_NOTIFICATION_AS_READ: {
            const { notifications } = state;
            const updatedNotification = action.options;
            const markedNotifications = notifications.map(n => {
                if (n.id === updatedNotification.id) {
                    return {
                        ...n,
                        read: true
                    };
                }
                return n;
            });
            return {
                notifications: markedNotifications
            };
        }
        case MARK_NOTIFICATION_AS_SEEN: {
            const { notifications } = state;
            const updatedNotification = action.options;
            const markedNotifications = notifications.map(n => {
                if (n.id === updatedNotification.id) {
                    return {
                        ...n,
                        shown: true
                    };
                }
                return n;
            });
            return {
                notifications: markedNotifications
            };
        }
        case REMOVE_NOTIFICATIONS: {
            return {
                // ...state,
                notifications: []
            };
        }
        default:
            return state;
    }
}
