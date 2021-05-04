import {Card} from '~/constants/cardFields';
import Reward from '~/constants/rewardType';

const calcPoints = (cards: Card[], rewards?: Reward[]): number => {
  const sum = cards.reduce((acc, c) => {
    if (c.topics && c.topics.value instanceof Array) {
      const ts = c.topics.value.filter(t => t.points);
      const tP = ts.reduce((acc2, t) => (t.points || 0) + acc2, 0);
      return acc + tP;
    }
    return acc;
  }, 0);

  const costs = rewards
    ? rewards.reduce((acc, r) => acc + (r ? r.points : 0), 0)
    : 0;

  return sum - costs;
};

export default calcPoints;
