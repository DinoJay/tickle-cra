import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import uuid from 'uuid';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import { doReadEventsFromUserInTime } from '~/firebase/db/event_db';
moment.locale('be');
const weekDays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
// GET EVENT COUNTS
// const counts = Array(7).fill(0);
// const counts = [23, 3, 24, 45, 5, 0, 0];
const Activities = props => {
    const { open, onClick, style, authUser: { uid } } = props;
    const [selectedValue, setSelectedValue] = useState(0);
    const [showValue, setShowValue] = useState(false);
    const [counts, setCounts] = useState([]);
    const [events, setEvents] = useState([]);
    const scale = scaleLinear()
        .domain(extent(counts, c => c.events.length))
        .range([0, 400]);
    const days = [];
    let startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');
    while (startOfWeek <= endOfWeek) {
        days.push({ date: startOfWeek.toDate(), events: [] });
        startOfWeek = startOfWeek.clone().add(1, 'd');
    }
    useEffect(() => {
        const startWeek = moment().startOf('week');
        const endWeek = moment().endOf('week');
        doReadEventsFromUserInTime(uid, startWeek.toDate(), endWeek.toDate()).then(evs => setEvents(evs.map(e => ({ ...e, created: e.created.toDate() }))));
        // .catch(err => console.log(err));
    }, []);
    console.log('events', events);
    useEffect(() => {
        const localEvents = days.map((d, idx) => ({
            ...d,
            events: events.filter(e => e.created >= d.date // && e.created <= days[idx + 1].date
            )
        }));
        setCounts(localEvents);
        console.log(localEvents);
    }, [events]);
    return (React.createElement(FlexCollapsible, { header: "Activity", className: "w-full overflow-hidden ", open: open, onClick: onClick, style: style, footer: React.createElement("div", { className: "flex flex-grow text-base" },
            React.createElement("div", { className: "flex" }),
            React.createElement("div", { className: "ml-auto items-center text-lg font-bold flex flex-wrap" })) },
        React.createElement("div", { className: "flex justify-center flex-wrap overflow-y-auto flex-max-grow mb-10" },
            React.createElement("div", { className: "flex flex-row justify-around w-full" }, counts.map((c, idx) => (React.createElement("div", { className: "flex flex-col", key: uuid.v4() },
                React.createElement("div", { className: "relative", style: { height: '500px' } },
                    React.createElement("div", { className: "border-2 w-12 my-4 absolute bottom-0 bg-white border-black ", style: {
                            height: scale(c.events.length)
                        } },
                        React.createElement("div", { className: "w-full bg-yellow-400", style: {
                                height: scale(c.events.filter(e => e.type === 'login').length)
                            } }),
                        React.createElement("div", { className: "w-full bg-red-400", style: {
                                height: scale(c.events.filter(e => e.type === 'submitted')
                                    .length)
                            } }))),
                React.createElement("p", { className: "text-center w-12" }, weekDays[idx]))))))));
};
export default Activities;
