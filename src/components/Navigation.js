import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { auth } from '~/firebase';
import { authRoutes, adminRoutes, nonAuthRoutes } from '~/constants/routeSpec';
const listItemClass = 'mb-1 p-2 text-xl cursor-pointer';
const ListItem = ({ path, children, userEnvId = [] }) => (React.createElement("li", { className: listItemClass },
    React.createElement(Link, { className: "link", to: `/${path}/${userEnvId}` }, children)));
const NavigationHelper = ({ location, routes, signOut, children, userEnvId }) => (React.createElement("ul", { className: "list-reset" },
    routes.map(r => (React.createElement(ListItem, Object.assign({ userEnvId: userEnvId }, r, { curPath: location.pathname }), children && children(r)))),
    signOut && (React.createElement("li", null,
        React.createElement("button", { type: "button", className: "btn border-2 p-2", onClick: () => {
                auth.doSignOut();
            } }, "Sign Out")))));
/**
 * Utility to map routes to session state i.e. authenticated,
 * not authenticated and admin
 */
const RouteNavigation = props => {
    const { authUser, match, location } = props;
    const { params: { userEnvId } } = match;
    if (authUser) {
        if (authUser.admin) {
            return (React.createElement(NavigationHelper, Object.assign({}, props, { location: location, userEnvId: userEnvId, signOut: true, routes: adminRoutes })));
        }
        return (React.createElement(NavigationHelper, Object.assign({}, props, { location: location, userEnvId: userEnvId, signOut: true, routes: authRoutes })));
    }
    return (React.createElement(NavigationHelper, Object.assign({}, props, { location: location, userEnvId: userEnvId, routes: nonAuthRoutes, signOut: false })));
};
const mapStateToProps = (state) => ({
    ...state.Session
});
const composer = compose(withRouter, connect(mapStateToProps));
export default composer(RouteNavigation);
