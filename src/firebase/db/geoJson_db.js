import {firestore} from '../firebase';

export default function(id, geoJson){

  return firestore
    .collection('card-environments')
    .doc(id)
    .collection('geoJsonFeatures')
    .doc(geoJson.id).set(geoJson);
}

// export default function mapFeature(userEnvStr) {
//   const dbRef = firestore
//     .collection('card-environments')
//     .doc(userEnvStr)
//     .collection('geoJsonFeatures');
//
//   return {
//     doReadMapFeat() {
//       return dbRef
//         .get()
//         .then(querySnapshot =>
//           querySnapshot.docs.map(envDoc => envDoc.data())
//         )
//         .catch(err => {
//           throw new Error(`Error when reading the geoJson: ${err}`);
//         });
//     },
//     doCreateMapFeat(geoJson) {
//       console.log('create gjson');
//       return dbRef.doc(geoJson.id).set(geoJson);
//       // .catch(err => {
//       //   throw new Error(`Error when creating a new geoJson: ${err}`);
//       // });
//     },
//     doDeleteMapFeat(id) {
//       if (typeof id === 'string') {
//         return dbRef
//           .doc(id)
//           .delete()
//           .catch(err => {
//             throw new Error(`Error removing geoJson: ${err}`);
//           });
//       }
//       throw new Error('Error paremeter id is not of type String');
//     }
//   };
// }
