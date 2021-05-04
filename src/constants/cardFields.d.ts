import Topic from "./topicType";
import Canvas from "./CanvasType";
import ActivitySubmission from "./activitySubmissionType";
import Activity from "~/constants/activityType";
import { Img } from "./typeUtils";
export declare const LOC = "loc";
export declare const TITLE = "title";
export declare const TOPICS = "topics";
export declare const DESCRIPTION = "description";
export declare const DATE_TIME = "dateTime";
export declare const MEDIA = "media";
export declare const TIMERANGE = "timerange";
export declare const ACTIVITY = "activity";
export declare const IMG = "img";
export declare const VIDEOS = "videos";
export declare const CARD_TYPE = "cardType";
export declare const CONTACT = "contact";
export declare const CANVAS = "canvas";
export declare const HYPERLINKS = "hyperlinks";
export declare const NO_ACTIVITY_FILTER = "NO_ACTIVITY_FILTER";
export declare const ACTIVITY_STARTED = "ACTIVITY_STARTED";
export declare const ACTIVITY_OPEN = "ACTIVITY_OPEN";
export declare const ACTIVITY_NOT_STARTED = "ACTIVITY_NOT_STARTED";
export declare const ACTIVITY_SUBMITTED = "ACTIVITY_SUBMITTED";
export declare const CHALLENGE_NOT_SUBMITTED = "CHALLENGE_NOT_SUBMITTED";
export declare const ACTIVITY_SUCCEEDED = "ACTIVITY_SUCCEEDED";
export declare const CARD_CREATED = "CARD_CREATED";
export declare const POINTS = "points";
export declare const EXTENDED_TOPICS = "extendedTopics";
export declare const SOFT_SKILLS = "softSkills";
export declare type DateTime = {
    key: "dateTime";
    value: {
        startDate: string;
        endDate: string;
    } | null;
};
export declare type LngLat = {
    latitude: number;
    longitude: number;
};
export declare type Link = {
    url: string;
    title: string;
    id: string;
};
export declare type Hyperlinks = {
    key: "hyperlinks";
    value: Link[] | null;
};
export declare type Description = {
    key: "description";
    value: string | null;
};
export declare type Loc = {
    key: string;
    value: {
        hidden?: boolean;
        latitude: number;
        longitude: number;
        radius: number;
        startDateTime?: any;
        endDateTime?: any;
        emailContact?: string;
        telephone?: string;
        comment?: string;
    };
};
export declare type ImgField = {
    key: "img";
    value: Img | null;
};
export declare type Title = {
    key: "title";
    label?: string | null;
    value: string | null;
};
export declare type TopicField = {
    key: "topics";
    value: Topic[] | null;
};
export declare type VideoField = {
    key: "videos";
    value: any[] | null;
};
export declare type DateField = {
    key: "date";
    value: any;
};
export declare type TimeRangeField = {
    key: "timerange";
    value: {
        startDate: string;
        endDate: string;
    } | null;
    thumbnail: string | null;
};
export declare type CanvasField = {
    key: "canvas";
    value: Canvas | null;
};
export interface Card {
    published?: boolean;
    id: string;
    uid: string;
    seen?: boolean;
    loc: Loc;
    img?: ImgField;
    timerange?: TimeRangeField;
    title?: Title;
    topics?: TopicField;
    softSkills?: {
        key: "softSkills";
        value: any;
    };
    dateTime?: DateTime;
    description?: Description;
    videos?: VideoField;
    date?: DateField;
    activity?: Activity;
    hyperlinks?: Hyperlinks;
    activitySubmission?: ActivitySubmission | null;
    allActivitySubs?: ActivitySubmission[];
    canvas?: CanvasField;
    [key: string]: any;
}
export declare type CardField = Loc | ImgField | TimeRangeField | DateTime | Description | VideoField | Activity | Hyperlinks;
export declare const TEMP_ID = "temp";
export declare const BOOKWIDGET = "bookwidget";
export declare const TEXT_CHALLENGE = "textChallenge";
export declare const QUIZ = "Quiz";
export declare const HANGMAN = "HANGMAN";
export declare const activityFields: {
    BOOKWIDGET: string;
    TEXT_CHALLENGE: string;
};
export declare const isActivitySucceeded: (c: Card) => boolean | null | undefined;
export declare const isActivityStarted: (c: Card) => boolean;
export declare const CARD_SEEN = "CARD_SEEN";
export declare const isCardSeen: (c: Card) => boolean;
export declare const isActivityOpen: ({ activitySubmission }: {
    activitySubmission: ActivitySubmission;
}) => boolean;
export declare const hasCardCreated: (c?: {
    uid: string;
}, uidTmp?: string) => boolean;
export declare const activityFilterMap: {
    [k: string]: (a: any) => any;
};
export declare const activityFilterLabelMap: {
    [k: string]: string;
};
export declare const cardFieldKeys: string[];
export declare const DEFAULT_CARD_TYPE: {
    id: string;
    label: string;
    color: any;
    cardFieldKeys: string[];
};
export declare const STORY_CARD_TYPE: {
    id: string;
    label: string;
    color: any;
    cardFieldKeys: string[];
};
export declare const ORGA_CARD_TYPE: {
    id: string;
    label: string;
    color: any;
    cardFieldKeys: string[];
};
export declare const CARD_TYPES: {
    id: string;
    label: string;
    color: any;
    cardFieldKeys: string[];
}[];
export declare const CARD_TYPES_DICT: {
    [x: string]: {
        id: string;
        label: string;
        color: any;
        cardFieldKeys: string[];
    };
};
export declare const fallbackTagValues: (topics: {
    value: any[];
}) => any[];
export declare const extractCardFields: (obj: Card) => Card;
export declare const initCardFields: Card;
export declare const isFieldInitialized: ({ card, attr }: {
    card: Card;
    attr: string;
}) => boolean;
export declare const getNumInitFields: (card: Card) => number;
export declare const mediaScale: (k: string) => any;
