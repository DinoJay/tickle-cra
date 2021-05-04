import {
  QuerySnapshot,
  DocumentSnapshot,
} from '@firebase/firestore-types';
import {firestore} from '../firebase';
import Topic from '~/constants/topicType';

export default function topicDb(
  userEnvStr: string
): {
  doCreateTopic: Function;
  doReadTopics: Function;
  doDeleteTopic: Function;
} {
  const dbRef = firestore
    .collection('card-environments')
    .doc(userEnvStr)
    .collection('topics');

  return {
    doReadTopics(): Promise<Topic[]> {
      return dbRef
        .get()
        .then((querySnapshot: QuerySnapshot) =>
          querySnapshot.docs.map((envDoc: DocumentSnapshot) =>
            envDoc.data()
          )
        );
    },
    doCreateTopic(topic: Topic): Promise<void> {
      return dbRef.doc(topic.id).set(topic);
    },
    doDeleteTopic(id: string): Promise<void> {
      return dbRef.doc(id).delete();
    }
  };
}
