import Topic from '~/constants/topicType';
import AuthUser from '~/constants/authUserType';
import Notification from '~/constants/notificationType';
import { Card } from '~/constants/cardFields';
import { RouterTypes } from '~/constants/typeUtils';

export default interface UniqProps extends RouterTypes {
  cards: Card[];
  height: number;
  width: number;
  userEnvId: string;
  fetchCollectibleCards: Function;
  notifications: Notification[];
  authUser: AuthUser;
  topicDict: Topic[];
  updateAuthUser: Function;
  fetchTopics: () => Promise<any>;
  locs: any[]
}
