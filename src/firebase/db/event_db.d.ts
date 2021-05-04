import Event from '~/constants/eventType';
export declare const doReadEventsFromDomain: (domain: string) => any;
export declare const doReadAllEvents: () => any;
export declare const doReadEventsFromUser: (email: string) => Promise<Event[]>;
export declare const doReadEventsFromUserInTime: (uid: string, startTime: Date, endTime: Date) => Promise<Event[]>;
export declare const doCreateEvent: (domain: string, type: string, payload: object) => void;
