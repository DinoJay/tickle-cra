import { Timestamp } from "@firebase/firestore-types";

export default interface Notification {
  id: string;
  cardId: string;
  refId: string;
  refCollection: string;
  title: string;
  meta: string;
  message: string;
  shown: boolean;
  read: boolean;
  env: string;
  created: Timestamp;
  // TODO more
}
