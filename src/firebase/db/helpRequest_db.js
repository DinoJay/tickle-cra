import { addToStorage, removeFromStorage } from './index';
// import {User} from '~/constants/userFields';
import { firestore /* , Timestamp */ } from '../firebase';
// interface Comment {
//   username: string;
//   uid: string;
//   url: string | null;
//   text: string;
//   avatar?: string;
//   date: Date;
// }
const makeHelpRequestFns = (ENV_STR) => {
    console.log('ENV_STR', ENV_STR);
    const TICKLE_ENV_REF = firestore
        .collection('card-environments')
        .doc(ENV_STR);
    const doDeleteHelpRequest = (cid) => TICKLE_ENV_REF.collection('helpRequests')
        .doc(cid)
        .delete();
    const doUpdateHelpRequest = (hq) => TICKLE_ENV_REF.collection('helpRequests')
        .doc(hq.id)
        .set(hq);
    const doReadHelpRequests = () => TICKLE_ENV_REF.collection('helpRequests')
        .get()
        .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() || []));
    const addFileToEnv = ({ file, path }) => addToStorage({ file, path: `${ENV_STR}/${path}` });
    const removeFileFromEnv = (path) => removeFromStorage(`${ENV_STR}/${path}`);
    return {
        doUpdateHelpRequest,
        doDeleteHelpRequest,
        addFileToEnv,
        removeFileFromEnv,
        doReadHelpRequests
    };
};
export default makeHelpRequestFns;
