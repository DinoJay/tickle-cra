import React from 'react';
import { max, group } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { scaleLinear } from 'd3-scale';
import { formatDay } from '~/components/utils/time';
import distanceLoc from '~/components/utils/distanceLoc';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
// moment.locale('be');
// const weekDays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
// GET EVENT COUNTS
// const counts = Array(7).fill(0);
// const counts = [23, 3, 24, 45, 5, 0, 0];
const Activities = props => {
    const { open, onClick, style, authUser: { uid }, locs } = props;
    const parseDay = timeParse('%d/%m/%Y, %H:%Mh'); // DD/MM/YYYY HH:MM
    const parsedLocs = locs.map(d => ({
        ...d,
        date: parseDay(d.date),
        day: formatDay(parseDay(d.date))
    }));
    const nestedLocs = [
        ...group(parsedLocs, d => d.day).entries()
    ].map(([key, values]) => ({ key, values }));
    console.log('nestedLocs', nestedLocs);
    const summedLocs = nestedLocs.map(d => ({
        ...d,
        sum: d.values
            .slice(0, -1)
            .reduce((acc, e, i) => acc + distanceLoc(e.coords, d.values[i + 1].coords), 0)
    }));
    console.log('summedLocs', summedLocs);
    const scale = scaleLinear()
        .domain([0, max(summedLocs, c => c.sum)])
        .range([0, 80]);
    return (React.createElement(FlexCollapsible, { header: "Activity", className: "w-full overflow-hidden ", open: open, onClick: onClick, style: style },
        React.createElement("div", { className: "flex mx-1 flex-grow overflow-y-auto " }, summedLocs.map(d => (React.createElement("div", { className: "flex mr-1 flex-col h-full justify-end items-center" },
            React.createElement("div", { className: "text-base" }, d.sum.toFixed(3)),
            React.createElement("div", { className: "bg-yellow-400 w-12", style: { minHeight: `${scale(d.sum)}%` } }),
            React.createElement("div", { className: "text-base" }, d.key)))))));
};
export default Activities;
