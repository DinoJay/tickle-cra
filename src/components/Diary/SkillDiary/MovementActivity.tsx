import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {max, group} from 'd3-array';
import uuid from 'uuid';
import {timeParse} from 'd3-time-format';

import {scaleLinear} from 'd3-scale';

import {formatDay} from '~/components/utils/time';
import distanceLoc from '~/components/utils/distanceLoc';
import FlexCollapsible from '~/components/utils/FlexCollapsible';

import {BlackModal, ModalBody} from '~/components/utils/Modal';

import PreviewTag from '~/components/utils/PreviewTag';

import TagDetail from '~/components/utils/TagDetail';
import {User} from '~/constants/userFields';
import {doReadEventsFromUserInTime} from '~/firebase/db/event_db';

// moment.locale('be');
// const weekDays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

// GET EVENT COUNTS
// const counts = Array(7).fill(0);
// const counts = [23, 3, 24, 45, 5, 0, 0];

const Activities: React.SFC<{
  authUser: User;
  open: boolean;
  onClick: Function;
  style?: React.CSSProperties;
  className?: string;
}> = props => {
  const {
    open,
    onClick,
    style,
    authUser: {uid},
    locs
  } = props;

  const parseDay = timeParse('%d/%m/%Y, %H:%Mh'); // DD/MM/YYYY HH:MM
  const parsedLocs = locs.map(d => ({
    ...d,
    date: parseDay(d.date),
    day: formatDay(parseDay(d.date))
  }));

  const nestedLocs = [
    ...group(parsedLocs, d => d.day).entries()
  ].map(([key, values]) => ({key, values}));

  const summedLocs = nestedLocs.map(d => ({
    ...d,
    sum: d.values
      .slice(0, -1)
      .reduce(
        (acc, e, i) =>
          acc + distanceLoc(e.coords, d.values[i + 1].coords),
        0
      )
  }));

  const scale = scaleLinear()
    .domain([0, max(summedLocs, c => c.sum)])
    .range([0, 80]);

  return (
    <div className="flex mx-1 flex-grow overflow-y-auto justify-center">
      {summedLocs.map(d => (
        <div className="flex mr-1 flex-col h-full justify-end items-center">
          <div className="text-base">{(d.sum / 10).toFixed(3)}km</div>
          <div
            className="bg-yellow-400 w-12"
            style={{minHeight: `${scale(d.sum)}%`}}
          />
          <div className="text-base">{d.key}</div>
        </div>
      ))}
    </div>
  );
};
export default Activities;
