import uuidv1 from 'uuid/v1';
import {
  QuerySnapshot,
  DocumentSnapshot
  // DocumentData,
  // DocumentReference
} from '@firebase/firestore-types';
import HelpRequest from '~/constants/HelpRequestType';

import {addToStorage, removeFromStorage} from './index';

// import {User} from '~/constants/userFields';

import {firestore /* , Timestamp */} from '../firebase';

// interface Comment {
//   username: string;
//   uid: string;
//   url: string | null;
//   text: string;
//   avatar?: string;
//   date: Date;
// }
const makeHelpRequestFns = (
  ENV_STR: string
): {
  doUpdateHelpRequest: Function;
  doDeleteHelpRequest: Function;
  addFileToEnv: Function;
  removeFileFromEnv: Function;
  doReadHelpRequests: Function;
  // readComments: Function;
  // addComment: Function;
} => {
  console.log('ENV_STR', ENV_STR);
  const TICKLE_ENV_REF = firestore
    .collection('card-environments')
    .doc(ENV_STR);

  const doDeleteHelpRequest = (cid: string): Promise<void> =>
    TICKLE_ENV_REF.collection('helpRequests')
      .doc(cid)
      .delete();

  const doUpdateHelpRequest = (hq: HelpRequest): Promise<void> =>
    TICKLE_ENV_REF.collection('helpRequests')
      .doc(hq.id)
      .set(hq);

  const doReadHelpRequests = (): Promise<HelpRequest[]> =>
    TICKLE_ENV_REF.collection('helpRequests')
      .get()
      .then((querySnapshot: QuerySnapshot) =>
        querySnapshot.docs.map(
          (doc: DocumentSnapshot) => doc.data() || []
        )
      );

  const addFileToEnv = ({
    file,
    path
  }: {
    file: unknown;
    path: string;
  }): Promise<void> => addToStorage({file, path: `${ENV_STR}/${path}`});

  const removeFileFromEnv = (path: string): Promise<void> =>
    removeFromStorage(`${ENV_STR}/${path}`);

  return {
    doUpdateHelpRequest,
    doDeleteHelpRequest,
    addFileToEnv,
    removeFileFromEnv,
    doReadHelpRequests
  };
};

export default makeHelpRequestFns;
