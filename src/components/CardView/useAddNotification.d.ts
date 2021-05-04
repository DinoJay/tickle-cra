import AuthUser from '~/constants/authUserType';
import { Card } from '~/constants/cardFields';
import Notification from '~/constants/notificationType';
import { LngLat } from '~/constants/typeUtils';
declare const useAddNotification: ({ cards, notifications, userLocation, authUser, userEnvId, asyncAddNotification }: {
    cards: Card[];
    notifications: Notification[];
    userLocation: LngLat;
    authUser: AuthUser;
    userEnvId: string;
    asyncAddNotification: (uid: string, not: Notification) => any;
}) => void;
export default useAddNotification;
