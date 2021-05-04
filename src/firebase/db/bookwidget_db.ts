import { firestore } from "../firebase";
import { QuerySnapshot, DocumentSnapshot } from "@firebase/firestore-types";

export interface BookWidgetType {
  nonAuthUrl: string;
  short_code: string;
  teacher_id: string;
  title: string;
  url: string;
}

export const doReadBookWidgets = (): Promise<BookWidgetType[]> =>
  firestore
    .collection("bookWidgets")
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map(bookWidgetDoc => bookWidgetDoc.data())
    );

export default function bookWidgetDB() {
  const dbRef = firestore.collection("bookWidgets");

  return {
    doReadBookWidgets(): Promise<BookWidgetType[]> {
      return dbRef
        .get()
        .then((querySnapshot: QuerySnapshot) =>
          querySnapshot.docs.map(bookWidgetDoc => bookWidgetDoc.data())
        );
    },
    doReadOneBookWidget(id: string): Promise<BookWidgetType> {
      return dbRef
        .doc(id)
        .get()
        .then((bookWidgetDoc: DocumentSnapshot) => {
          bookWidgetDoc.data();
        });
    },
    doDeleteBookWidget(id: string) {
      return dbRef.doc(id).delete();
    }
  };
}
