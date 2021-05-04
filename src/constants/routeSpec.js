/** Defining all the route constants for the Router
 * In order to use them in the Router you have to add a '/'
 * TODO: maybe already the slash here include here
 */
export const TAGS = 'TAGS';
export const GEO = 'GEO';
export const TopicMap = 'topic-map';
export const TreeAuthor = 'TreeAuthor';
export const SIGN_UP_PATH = 'signup';
export const SIGN_IN_PATH = 'signin';
export const LANDING_PATH = '/';
export const LEADERBOARD_PATH = 'leaderboard';
export const DATAVIEW_PATH = 'dataview';
export const GEO_VIEW_PATH = `${DATAVIEW_PATH}/${GEO}`;
// export const TOPICMAP_VIEW_PATH = `${DATAVIEW_PATH}/${TopicMap}`;
export const TAG_VIEW_PATH = `${DATAVIEW_PATH}/${TAGS}`;
export const AUTHOR_PATH = 'card-author';
export const GEO_AUTHOR_PATH = `${AUTHOR_PATH}/${GEO}`;
export const TOPIC_AUTHOR_PATH = `${AUTHOR_PATH}/${TopicMap}`;
// Not included, maybe delete
export const TREE_AUTHOR_PATH = `${AUTHOR_PATH}/${TreeAuthor}`;
// export const TAG_AUTHOR_PATH = `${AUTHOR_PATH}/${TAGS}`;
export const TOPIC_VIEW_PATH = 'topic-view';
export const ADMIN_PATH = 'admin';
export const PASSWORD_FORGET_PATH = '/pw-forget';
export const HOME_PATH = 'home';
export const MYCARDS_PATH = 'my-cards';
export const ADMIN_SIGN_UP_PATH = 'signup-admin';
export const HOME = { name: 'Home', path: HOME_PATH, subRoutes: [] };
export const MYCARDS = {
    name: 'My Cards',
    path: MYCARDS_PATH,
    subRoutes: []
};
export const SIGN_IN = {
    name: 'Sign In',
    path: SIGN_IN_PATH,
    subRoutes: []
};
export const SIGN_UP = {
    name: 'Sign In',
    path: SIGN_UP_PATH,
    subRoutes: []
};
export const ADMIN_SIGN_UP = {
    name: 'ADMIN_SIGN_UP',
    path: ADMIN_SIGN_UP_PATH,
    subRoutes: []
};
export const LANDING = {
    name: 'Landing',
    path: LANDING_PATH,
    subRoutes: []
};
export const LEADERBOARD = {
    name: 'Leaderboard',
    path: LEADERBOARD_PATH,
    subRoutes: []
};
export const GEO_VIEW = { name: 'Geo View', path: GEO_VIEW_PATH };
// export const TOPIC_VIEW = {name: 'Topic Map', path: TOPICMAP_VIEW_PATH};
export const TAG_VIEW = { name: 'Tag View', path: TAG_VIEW_PATH };
export const MAP_VIEW = {
    name: 'View Cards',
    path: GEO_VIEW_PATH,
    subRoutes: [GEO_VIEW]
};
export const GEO_AUTHOR = { name: 'Geo', path: GEO_AUTHOR_PATH };
// export const TOPIC_AUTHOR = {name: 'TopicMap', path: TOPIC_AUTHOR_PATH};
export const TREE_AUTHOR = {
    name: 'Tree Author',
    path: TREE_AUTHOR_PATH
};
export const AUTHOR = {
    name: 'Create Cards',
    path: AUTHOR_PATH,
    subRoutes: []
};
export const TOPIC_VIEW = {
    name: 'Topic View',
    path: TOPIC_VIEW_PATH,
    subRoutes: []
};
export const ADMIN = { name: 'Admin', path: ADMIN_PATH, subRoutes: [] };
export const PASSWORD_FORGET = {
    name: 'Forget Password ?',
    path: PASSWORD_FORGET_PATH
};
export const routes = [
    HOME,
    SIGN_IN,
    LANDING,
    MAP_VIEW,
    PASSWORD_FORGET,
    ADMIN,
    TOPIC_VIEW,
    MYCARDS
];
export const authRoutes = [MAP_VIEW, MYCARDS, TOPIC_VIEW];
export const adminRoutes = [MAP_VIEW, ADMIN, MYCARDS, TOPIC_VIEW];
export const nonAuthRoutes = [HOME, SIGN_IN, LANDING, PASSWORD_FORGET];
