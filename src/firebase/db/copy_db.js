import {firestore} from '../firebase';

export const readCopyVdsOldUsers = () => {
  firestore
    .collection('vds_old_users')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all vds_old_users to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('vds_old_users')
          .collection('vds_old_users')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyVdsGeoUsers = () => {
  firestore
    .collection('vds_geo_users')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all vds_geo_users to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('vds_geo_users')
          .collection('vds_geo_users')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyVdsGeoCards = () => {
  firestore
    .collection('vds_geo_cards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all vds_geo_cards to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('vds_geo_cards')
          .collection('vds_geo_cards')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyTmpCards = () => {
  firestore
    .collection('tmpCards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all tmpCards to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('tmpCards')
          .collection('tmpCards')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyStagingVdsGeoUsers = () => {
  firestore
    .collection('staging_vds_geo_users')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all staging_vds_geo_users to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('staging_vds_geo_users')
          .collection('staging_vds_geo_users')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyStagingVdsGeoCards = () => {
  firestore
    .collection('staging_vds_geo_cards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all staging_vds_geo_cards to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('staging_vds_geo_cards')
          .collection('staging_vds_geo_cards')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyOldUsers2 = () => {
  firestore
    .collection('old_users_2')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all old_users_2 to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('old_users_2')
          .collection('old_users_2')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyMeetingCards = () => {
  firestore
    .collection('meetingCards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all meetingCards to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('meetingCards')
          .collection('meetingCards')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyJanCards = () => {
  firestore
    .collection('jan_cards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('Copy all jan_cards to archive');
        return firestore
          .collection('ARCHIVE')
          .doc('jan_cards')
          .collection('jan_cards')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyChallengeSubmissions = () => {
  firestore
    .collection('jan_cards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        doc.ref
          .collection('challengeSubmissions')
          .get()
          .then(qrySnap => {
            qrySnap.docs.map(cDoc => {
              return firestore
                .collection('ARCHIVE')
                .doc('jan_cards')
                .collection('jan_cards')
                .doc(doc.id)
                .collection('challengeSubmissions')
                .doc(cDoc.id)
                .set(cDoc.data());
            });
          });
      });
    });
};

export const readCopyCards = () => {
  firestore
    .collection('cards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        return firestore
          .collection('ARCHIVE')
          .doc('cards')
          .collection('cards')
          .doc(doc.id)
          .set(doc.data());
      });
    });
};

export const readCopyCardsChallengeSubmissions = () => {
  firestore
    .collection('cards')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        doc.ref
          .collection('challengeSubmissions')
          .get()
          .then(qrySnap => {
            qrySnap.docs.map(cDoc => {
              return firestore
                .collection('ARCHIVE')
                .doc('cards')
                .collection('cards')
                .doc(doc.id)
                .collection('challengeSubmissions')
                .doc(cDoc.id)
                .set(cDoc.data());
            });
          });
      });
    });
};

export const readCopyCardComments = () => {
  firestore
    .collection('cardComments')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        doc.ref
          .collection('comments')
          .get()
          .then(qrySnap => {
            qrySnap.docs.map(cDoc => {
              // console.log('Copy all the comments subcollection of cardComments');
              return firestore
                .collection('ARCHIVE')
                .doc('cardComments')
                .collection('cardComments')
                .doc(doc.id)
                .collection('comments')
                .doc(cDoc.id)
                .set(cDoc.data());
            });
          });
      });
    });
};
