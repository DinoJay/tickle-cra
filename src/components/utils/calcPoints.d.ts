import { Card } from '~/constants/cardFields';
import Reward from '~/constants/rewardType';
declare const calcPoints: (cards: Card[], rewards?: Reward[] | undefined) => number;
export default calcPoints;
