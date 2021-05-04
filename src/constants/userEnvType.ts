import {Img} from './typeUtils';
import {Card} from './cardFields';

import Reward from './rewardType';

export default interface UserEnv {
  id: string;
  authorId: string;
  description: string;
  name: string;
  img: Img | null;
  uids: string[];
  rewards: Reward[];
  // TODO change in db to cardIds later
  cards: Card[];
  publicEnv?: boolean;
  // TODO change in db to userIds later
  users?: string[];
}
