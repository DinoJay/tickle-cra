/** Defining all the route constants for the Router
 * In order to use them in the Router you have to add a '/'
 * TODO: maybe already the slash here include here
 */
export declare const TAGS = "TAGS";
export declare const GEO = "GEO";
export declare const TopicMap = "topic-map";
export declare const TreeAuthor = "TreeAuthor";
export declare const SIGN_UP_PATH = "signup";
export declare const SIGN_IN_PATH = "signin";
export declare const LANDING_PATH = "/";
export declare const LEADERBOARD_PATH = "leaderboard";
export declare const DATAVIEW_PATH = "dataview";
export declare const GEO_VIEW_PATH: string;
export declare const TAG_VIEW_PATH: string;
export declare const AUTHOR_PATH = "card-author";
export declare const GEO_AUTHOR_PATH: string;
export declare const TOPIC_AUTHOR_PATH: string;
export declare const TREE_AUTHOR_PATH: string;
export declare const TOPIC_VIEW_PATH = "topic-view";
export declare const ADMIN_PATH = "admin";
export declare const PASSWORD_FORGET_PATH = "/pw-forget";
export declare const HOME_PATH = "home";
export declare const MYCARDS_PATH = "my-cards";
export declare const ADMIN_SIGN_UP_PATH = "signup-admin";
export declare const HOME: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const MYCARDS: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const SIGN_IN: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const SIGN_UP: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const ADMIN_SIGN_UP: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const LANDING: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const LEADERBOARD: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const GEO_VIEW: {
    name: string;
    path: string;
};
export declare const TAG_VIEW: {
    name: string;
    path: string;
};
export declare const MAP_VIEW: {
    name: string;
    path: string;
    subRoutes: {
        name: string;
        path: string;
    }[];
};
export declare const GEO_AUTHOR: {
    name: string;
    path: string;
};
export declare const TREE_AUTHOR: {
    name: string;
    path: string;
};
export declare const AUTHOR: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const TOPIC_VIEW: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const ADMIN: {
    name: string;
    path: string;
    subRoutes: never[];
};
export declare const PASSWORD_FORGET: {
    name: string;
    path: string;
};
export declare const routes: {
    name: string;
    path: string;
}[];
export declare const authRoutes: {
    name: string;
    path: string;
    subRoutes: {
        name: string;
        path: string;
    }[];
}[];
export declare const adminRoutes: {
    name: string;
    path: string;
    subRoutes: {
        name: string;
        path: string;
    }[];
}[];
export declare const nonAuthRoutes: {
    name: string;
    path: string;
}[];
