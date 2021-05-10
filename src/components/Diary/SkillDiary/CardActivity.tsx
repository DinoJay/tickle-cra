import React, { useState, useEffect } from 'react';
import { scaleLinear } from 'd3-scale';
import { max, group } from 'd3-array';
import { formatDay } from '~/components/utils/time';
import clsx from 'clsx';

import { User } from '~/constants/userFields';
import { doReadEventsFromUserInTime } from '~/firebase/db/event_db';
import { Card } from '~/constants/cardFields';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

// GET EVENT COUNTS
// const counts = Array(7).fill(0);
// const counts = [23, 3, 24, 45, 5, 0, 0];

const Activities: React.SFC<{
  authUser: User;
  open: boolean;
  onClick: Function;
  style?: React.CSSProperties;
  className?: string;
  cards: Card[]
}> = props => {
  const {
    open,
    onClick,
    style,
    authUser: { uid },
    cards
  } = props;

  const activitySubs = cards
    .filter(c => c.activitySubmission)
    .map(c => ({ ...c.activitySubmission, card: c }));

  const nestedActivitySubs = [
    ...group(
      activitySubs.map(d => ({
        ...d,
        day: formatDay(d.date.toDate())
      })),
      d => d.day
    )
  ].map(([key, values]) => ({ key, values }));
  // console.log('nestedActivitySubs', nestedActivitySubs);

  const scale = scaleLinear()
    .domain([0, max(nestedActivitySubs, c => c.values.length)])
    .range([0, 80]);

  const succeededActSub = (d: any) =>
    d.values.filter(e => e.succeeded).length;

  return (
    <>
      <div className="text-base m-1">
        <div className="flex items-center justify-between mb-1">
          <div>Challenge submission</div>
          <div className="w-6 h-6 bg-yellow-400 mx-2 border-black border" />
        </div>
        <div className="flex items-center justify-between">
          <div>Succeeded submission</div>
          <div className="w-6 h-6 bg-yellow-600 mx-2 border-black border" />
        </div>
      </div>
      <div
        className={clsx(
          'flex mx-2 flex-grow overflow-y-auto ',
          nestedActivitySubs.length <= 3 && 'justify-center'
        )}>
        {nestedActivitySubs.map(d => (
          <div className="flex mr-2 flex-col h-full justify-end items-center">
            <div className="h-full flex flex-col justify-end items-center relative">
              <div className="text-base">{d.values.length}</div>
              <div
                role="button"
                className="bg-yellow-400 w-12 border-2 border-black"
                style={{ minHeight: `${scale(d.values.length)}%` }}
                onClick={() =>
                  onClick(
                    d.values.filter(d => !d.succeeded).map(d => d.card)
                  )
                }
              />
              {succeededActSub(d) ? (
                <div
                  onClick={() =>
                    onClick(
                      d.values.filter(d => d.succeeded).map(d => d.card)
                    )
                  }
                  role="button"
                  className="absolute bg-yellow-600 border-2 border-black w-12 text-base flex justify-center"
                  style={{
                    minHeight: `${scale(succeededActSub(d))}%`,
                    maxHeight: `${scale(succeededActSub(d))}%`
                  }}>
                  {succeededActSub(d)}
                </div>
              ) : null}
            </div>
            <div className="text-base">{d.key}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Activities;
