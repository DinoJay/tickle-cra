import { firestore } from '../firebase';
export default function rewardDb(userEnvStr) {
    const dbRef = firestore
        .collection('card-environments')
        .doc(userEnvStr)
        .collection('rewards');
    return {
        doReadRewards() {
            return dbRef
                .get()
                .then((querySnapshot) => querySnapshot.docs.map((envDoc) => envDoc.data()));
        },
        doCreateReward(reward) {
            return dbRef.doc(reward.id).set(reward);
        },
        doDeleteReward(id) {
            if (typeof id === 'string') {
                return dbRef.doc(id).delete();
            }
            throw new Error('Error paremeter id is not of type String');
        }
    };
}
