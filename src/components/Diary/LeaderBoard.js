import React, { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { avatarUrls } from '~/constants/avatars';
import calcPoints from '~/components/utils/calcPoints';
/**
 * This Component displays all the cards the use has interfaced with.
 * This means submitted, rated, and bookmarked cards
 * TODO: filter options and testing in general
 * @param {cards} user cards
 */
import CardDB from '~/firebase/db/card_db';
const readCardsWithSubmission = (userEnvId) => {
    const db = CardDB(userEnvId);
    return db
        .doReadCards()
        .then((data) => Promise.all(data.map((d) => db
        .doReadSubmissions(d.id)
        .then((allActivitySubs) => ({ ...d, allActivitySubs })))));
};
const UserCollapsible = props => {
    const { user, points, allPoints } = props;
    const [ext, setExt] = useState(false);
    return (React.createElement("div", { className: "border-b-2 w-full mb-2", key: user.uid },
        React.createElement("div", { className: "flex" },
            React.createElement("div", { className: "flex flex-grow relative" },
                React.createElement("div", { className: "flex p-1 items-center w-full" },
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("img", { className: "h-12 w-12 mr-2", alt: "avatar", src: avatarUrls[user.avatar] || avatarUrls.user1 }),
                        React.createElement("div", { className: "truncate text-xl" }, user.username)),
                    React.createElement("div", { className: "ml-auto text-2xl" },
                        points,
                        "XP"))))));
};
const LeaderBoard = props => {
    const { fetchUsers, userEnvId, users = [] } = props;
    const [cards, setCards] = useState([]);
    useEffect(() => {
        fetchUsers(userEnvId);
        readCardsWithSubmission(userEnvId).then(setCards);
    }, [userEnvId]);
    const userAndPoints = users
        .map(u => ({
        user: u,
        cards: cards.filter((c) => c.allActivitySubs &&
            c.allActivitySubs
                .filter(d => d.succeeded)
                .map(s => s.uid)
                .includes(u.uid))
    }))
        .map(d => ({ ...d, points: calcPoints(d.cards) }));
    const allPoints = calcPoints(cards);
    return (React.createElement("div", { className: "flex flex-col flex-grow" },
        React.createElement("div", { className: "flex flex-col flex-grow" }, sortBy(userAndPoints, 'points')
            .reverse()
            .map(({ user, points }) => (React.createElement(UserCollapsible, { user: user, points: points, allPoints: allPoints }))))));
};
export default LeaderBoard;
