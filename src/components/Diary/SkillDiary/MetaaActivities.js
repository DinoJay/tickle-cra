import React from 'react';
import moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { max, group } from 'd3-array';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import { formatDay } from '~/components/utils/time';
moment.locale('be');
const weekDays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
// GET EVENT COUNTS
// const counts = Array(7).fill(0);
// const counts = [23, 3, 24, 45, 5, 0, 0];
const Activities = props => {
    const { open, onClick, style, authUser: { uid }, cards } = props;
    console.log('props', props);
    const activitySubs = cards
        .map(c => c.activitySubmission)
        .filter(Boolean);
    const nestedActivitySubs = [
        ...group(activitySubs.map(d => ({
            ...d,
            day: formatDay(d.date.toDate())
        })), d => d.day)
    ].map(([key, values]) => ({ key, values }));
    console.log('nestedActivitySubs', nestedActivitySubs);
    const scale = scaleLinear()
        .domain([0, max(nestedActivitySubs, c => c.values.length)])
        .range([0, 80]);
    const succeededActSub = d => d.values.filter(e => e.succeeded).length;
    return (React.createElement(FlexCollapsible, { header: "Activity", className: "w-full overflow-hidden ", open: open, onClick: onClick, style: style, footer: React.createElement("div", { className: "flex flex-grow text-base" },
            React.createElement("button", { type: "button", className: "btn flex-grow" }, "Movement"),
            React.createElement("button", { type: "button", className: "btn flex-grow" }, "Challenges")) },
        React.createElement("div", { className: "flex mx-1 flex-grow overflow-y-auto " }, nestedActivitySubs.map(d => (React.createElement("div", { className: "flex mr-2 flex-col h-full justify-end items-center" },
            React.createElement("div", { className: "h-full flex flex-col justify-end items-center relative" },
                React.createElement("div", { className: "text-base" }, d.values.length),
                React.createElement("div", { className: "bg-yellow-400 w-12", style: { minHeight: `${scale(d.values.length)}%` } }),
                succeededActSub(d) ? (React.createElement("div", { className: "absolute bg-yellow-700 w-12 text-base flex justify-center", style: {
                        minHeight: `${scale(succeededActSub(d))}%`,
                        maxHeight: `${scale(succeededActSub(d))}%`
                    } }, succeededActSub(d))) : null),
            React.createElement("div", { className: "text-base" }, d.key)))))));
};
export default Activities;
