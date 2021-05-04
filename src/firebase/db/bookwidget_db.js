import { firestore } from "../firebase";
export const doReadBookWidgets = () => firestore
    .collection("bookWidgets")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map(bookWidgetDoc => bookWidgetDoc.data()));
export default function bookWidgetDB() {
    const dbRef = firestore.collection("bookWidgets");
    return {
        doReadBookWidgets() {
            return dbRef
                .get()
                .then((querySnapshot) => querySnapshot.docs.map(bookWidgetDoc => bookWidgetDoc.data()));
        },
        doReadOneBookWidget(id) {
            return dbRef
                .doc(id)
                .get()
                .then((bookWidgetDoc) => {
                bookWidgetDoc.data();
            });
        },
        doDeleteBookWidget(id) {
            return dbRef.doc(id).delete();
        }
    };
}
