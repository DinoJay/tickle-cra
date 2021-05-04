import AlignLeftIcon from "react-feather/dist/icons/align-left";
import ImageIcon from "react-feather/dist/icons/image";
import FilmIcon from "react-feather/dist/icons/film";
import LinkIcon from "react-feather/dist/icons/link";
import GeoIcon from "react-feather/dist/icons/map";

import { theme } from "Tailwind";
import Topic from "./topicType";
import Canvas from "./CanvasType";
import ActivitySubmission from "./activitySubmissionType";
import Activity from "~/constants/activityType";
import { Img } from "./typeUtils";

const { colors } = theme;

export const LOC = "loc";
export const TITLE = "title";
export const TOPICS = "topics";
export const DESCRIPTION = "description";
export const DATE_TIME = "dateTime";
export const MEDIA = "media";
export const TIMERANGE = "timerange";
export const ACTIVITY = "activity";
export const IMG = "img";
export const VIDEOS = "videos";
export const CARD_TYPE = "cardType";
export const CONTACT = "contact";
export const CANVAS = "canvas";
// export const DATE = 'date';
export const HYPERLINKS = "hyperlinks";

export const NO_ACTIVITY_FILTER = "NO_ACTIVITY_FILTER";
export const ACTIVITY_STARTED = "ACTIVITY_STARTED";
export const ACTIVITY_OPEN = "ACTIVITY_OPEN";

export const ACTIVITY_NOT_STARTED = "ACTIVITY_NOT_STARTED";
export const ACTIVITY_SUBMITTED = "ACTIVITY_SUBMITTED";
export const CHALLENGE_NOT_SUBMITTED = "CHALLENGE_NOT_SUBMITTED";
export const ACTIVITY_SUCCEEDED = "ACTIVITY_SUCCEEDED";
export const CARD_CREATED = "CARD_CREATED";

// TODO check card fields and reimplement it
// TODO check card fields and reimplement it
// TODO check card fields and reimplement it
// TODO check card fields and reimplement it
// TODO check card fields and reimplement it
const DATE = "date";
export const POINTS = "points";
export const EXTENDED_TOPICS = "extendedTopics";
export const SOFT_SKILLS = "softSkills";

// export interface ActivitySubmission {
//   value: object;
//   cardId: string;
//   // TODO still relevant???
//   playerId: string;
//   type: string;
// }

// interface KeyVal {
//   key: string;
//   label: string;
//   value: null;
// }
//
export type DateTime = {
  key: "dateTime";
  value: { startDate: string; endDate: string } | null;
};

export type LngLat = {
  latitude: number;
  longitude: number;
};

export type Link = { url: string; title: string; id: string };
export type Hyperlinks = { key: "hyperlinks"; value: Link[] | null };
export type Description = { key: "description"; value: string | null };
export type Loc = {
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

export type ImgField = { key: "img"; value: Img | null };
export type Title = {
  key: "title";
  label?: string | null;
  value: string | null;
};

export type TopicField = { key: "topics"; value: Topic[] | null };
export type VideoField = { key: "videos"; value: any[] | null };
export type DateField = { key: "date"; value: any };
export type TimeRangeField = {
  key: "timerange";
  value: { startDate: string; endDate: string } | null;
  thumbnail: string | null;
};

export type CanvasField = { key: "canvas"; value: Canvas | null };

export interface Card {
  // TODO
  // createdAt:
  published?: boolean;
  id: string;
  uid: string;
  seen?: boolean;
  loc: Loc;
  img?: ImgField;
  timerange?: TimeRangeField;
  // TODO
  title?: Title;
  topics?: TopicField;
  softSkills?: { key: "softSkills"; value: any };
  // TODO
  dateTime?: DateTime;
  description?: Description;
  videos?: VideoField;
  date?: DateField;
  // TODO
  activity?: Activity;
  hyperlinks?: Hyperlinks;
  activitySubmission?: ActivitySubmission | null;
  // TODO
  allActivitySubs?: ActivitySubmission[];
  canvas?: CanvasField;
  // TODO
  [key: string]: any;
}
export type CardField =
  | Loc
  | ImgField
  | TimeRangeField
  | DateTime
  | Description
  | VideoField
  | Activity
  | Hyperlinks;

const isDefined = (a: Record<string, any>) => a !== null && a !== undefined;

export const TEMP_ID = "temp";

export const BOOKWIDGET = "bookwidget";
export const TEXT_CHALLENGE = "textChallenge";
export const QUIZ = "Quiz";
export const HANGMAN = "HANGMAN";

export const activityFields = { BOOKWIDGET, TEXT_CHALLENGE };

export const isActivitySucceeded = (c: Card) =>
  c.activitySubmission && c.activitySubmission.succeeded;

export const isActivityStarted = (c: Card): boolean =>
  !!c.activitySubmission && !c.activitySubmission.succeeded;

// TODO: update later
export const CARD_SEEN = "CARD_SEEN";
export const isCardSeen = (c: Card) =>
  isActivityStarted(c) ||
  isActivityStarted(c) ||
  isActivitySucceeded(c) ||
  c.seen === true;

export const isActivityOpen = ({
  activitySubmission
}: {
  activitySubmission: ActivitySubmission;
}) => !isDefined(activitySubmission);

export const hasCardCreated = (c = { uid: "2332" }, uidTmp = "12345") =>
  c.uid === uidTmp;

export const activityFilterMap = (() => {
  const obj: { [k: string]: (a: any) => any } = {
    [ACTIVITY_STARTED]: isActivityStarted,
    [ACTIVITY_SUBMITTED]: isActivityStarted,
    [ACTIVITY_SUCCEEDED]: isActivitySucceeded,
    [ACTIVITY_OPEN]: isActivityOpen,
    [NO_ACTIVITY_FILTER]: () => true,
    [CARD_CREATED]: hasCardCreated,
    [CARD_SEEN]: isCardSeen
  };
  return obj;
})();

export const activityFilterLabelMap: { [k: string]: string } = (() => {
  const obj = {
    [ACTIVITY_STARTED]: "started",
    [ACTIVITY_SUBMITTED]: "submitted",
    [ACTIVITY_SUCCEEDED]: "collected",
    [ACTIVITY_OPEN]: "open",
    [NO_ACTIVITY_FILTER]: "all",
    [CARD_CREATED]: "created",
    [CARD_SEEN]: "seen"
  };
  return obj;
})();

export const cardFieldKeys = [
  LOC,
  TITLE,
  TOPICS,
  EXTENDED_TOPICS,
  DESCRIPTION,
  MEDIA,
  TIMERANGE,
  ACTIVITY,
  IMG,
  VIDEOS,
  DATE,
  HYPERLINKS,
  CARD_TYPE
];

export const DEFAULT_CARD_TYPE = {
  id: "default",
  label: "Challenge Card",
  color: colors.indigo[300],
  cardFieldKeys
};
export const STORY_CARD_TYPE = {
  id: "story",
  label: "Story",
  color: colors.teal[300],
  cardFieldKeys: [
    LOC,
    TITLE,
    TOPICS,
    EXTENDED_TOPICS,
    DESCRIPTION,
    MEDIA,
    TIMERANGE,
    ACTIVITY,
    IMG,
    VIDEOS,
    DATE,
    HYPERLINKS
  ]
};
export const ORGA_CARD_TYPE = {
  id: "organization",
  label: "Organization",
  color: colors.orange[300],
  cardFieldKeys: [
    LOC,
    TITLE,
    TOPICS,
    EXTENDED_TOPICS,
    DESCRIPTION,
    MEDIA,
    TIMERANGE,
    ACTIVITY,
    IMG,
    VIDEOS,
    DATE,
    HYPERLINKS
  ]
};

export const CARD_TYPES = [DEFAULT_CARD_TYPE, STORY_CARD_TYPE, ORGA_CARD_TYPE];

export const CARD_TYPES_DICT = {
  [DEFAULT_CARD_TYPE.id]: DEFAULT_CARD_TYPE,
  [STORY_CARD_TYPE.id]: STORY_CARD_TYPE,
  [ORGA_CARD_TYPE.id]: ORGA_CARD_TYPE
};

const DEFAULT_TAG = "general";
export const fallbackTagValues = (topics: { value: any[] }) =>
  topics.value !== null ? topics.value : [DEFAULT_TAG];

// TODO: where is activity submission?
const defaultObjVal = (key: any) => ({
  key,
  label: null,
  value: null
});

export const extractCardFields = (obj: Card): Card => {
  const {
    id = TEMP_ID,
    uid = "defaultUID",
    published = true,
    loc = {
      // TODO change
      key: LOC,
      value: { latitude: 50.85146, longitude: 4.315483, radius: Infinity }
    },
    img = defaultObjVal(IMG),
    timerange = { ...defaultObjVal(TIMERANGE), thumbnail: null },
    title = defaultObjVal(TITLE),
    topics = defaultObjVal(TOPICS),
    softSkills = defaultObjVal(SOFT_SKILLS),
    extendedTopics = defaultObjVal(EXTENDED_TOPICS),
    dateTime = defaultObjVal(DATE_TIME),
    description = defaultObjVal(DESCRIPTION),
    videos = defaultObjVal(VIDEOS),
    date = defaultObjVal(DATE),
    activity = { ...defaultObjVal(ACTIVITY), type: null },
    hyperlinks = defaultObjVal(HYPERLINKS),
    contact = defaultObjVal(CONTACT),
    canvas = defaultObjVal(CANVAS),
    activitySubmission = null,
    allActivitySubs = [],
    cardType = {
      key: CARD_TYPE,
      label: null,
      value: DEFAULT_CARD_TYPE.id
    }
  } = obj;

  return {
    id,
    uid,
    img, // {url, thumbnail, title}
    loc,
    date,
    published,
    timerange,
    dateTime,
    extendedTopics,
    softSkills,
    topics,
    videos,
    title,
    activity,
    description,
    hyperlinks,
    activitySubmission,
    allActivitySubs,
    cardType,
    contact,
    canvas
  };
};

export const initCardFields = extractCardFields({
  id: TEMP_ID,
  uid: "defaultUID",
  loc: {
    // TODO change
    key: "loc",
    value: { latitude: 50.85146, longitude: 4.315483, radius: Infinity }
  }
});

export const isFieldInitialized = ({
  card,
  attr
}: {
  card: Card;
  attr: string;
}): boolean => {
  const c: any = extractCardFields(card)[attr];

  return c.value !== null;
};

export const getNumInitFields = (card: Card) => {
  const isInit = (attr: string) => isFieldInitialized({ card, attr });

  return [
    isInit("title"),
    isInit("topics"),
    isInit("media"),
    isInit("description")
  ].filter(d => d).length;
};

export const mediaScale = (k: string) => {
  const iconMap: { [key: string]: any } = {
    [DESCRIPTION]: AlignLeftIcon,
    [IMG]: ImageIcon,
    [VIDEOS]: FilmIcon,
    [HYPERLINKS]: LinkIcon,
    [LOC]: GeoIcon
  };

  return iconMap[k];
};
