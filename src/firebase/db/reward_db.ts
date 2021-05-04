import {
  QuerySnapshot,
  DocumentSnapshot
} from '@firebase/firestore-types';

import {firestore} from '../firebase';
import Reward from '~/constants/rewardType';

export default function rewardDb(
  userEnvStr: string
): {
  doReadRewards: Function;
  doCreateReward: Function;
  doDeleteReward: Function;
} {
  const dbRef = firestore
    .collection('card-environments')
    .doc(userEnvStr)
    .collection('rewards');

  return {
    doReadRewards(): Promise<Reward> {
      return dbRef
        .get()
        .then((querySnapshot: QuerySnapshot) =>
          querySnapshot.docs.map((envDoc: DocumentSnapshot) =>
            envDoc.data()
          )
        );
    },
    doCreateReward(reward: Reward): Promise<unknown> {
      return dbRef.doc(reward.id).set(reward);
    },
    doDeleteReward(id: string): Promise<unknown> {
      if (typeof id === 'string') {
        return dbRef.doc(id).delete();
      }
      throw new Error('Error paremeter id is not of type String');
    }
  };
}
