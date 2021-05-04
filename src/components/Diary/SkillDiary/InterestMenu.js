import React from 'react';
import { isActivitySucceeded } from '~/constants/cardFields';
import BarChart from './BarChart';
import setify from '~/components/utils/setify';
import calcPoints from '~/components/utils/calcPoints';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
const InterestMenu = props => {
    const { cards, open, onClick, allXpoints } = props;
    const succeededCards = cards.filter(isActivitySucceeded);
    const ps = calcPoints(succeededCards);
    const sets = setify(succeededCards);
    return (React.createElement(FlexCollapsible, { className: "mb-2", header: React.createElement("h4", null, "Interests"), open: open, onClick: onClick, footer: React.createElement("div", { className: "w-full flex justify-between items-center" },
            React.createElement("div", { className: "text-xl " },
                ps,
                "XP")) },
        sets.length === 0 && (React.createElement("div", { className: "text-xl italic m-1" }, "No Interests")),
        React.createElement(BarChart, { cards: cards, className: "m-1 md:px-3 overflow-y-auto", countAcc: (d) => d.points || 0, data: sets, imgAcc: (d) => (d.img ? d.img.url : null) })));
};
export default InterestMenu;
