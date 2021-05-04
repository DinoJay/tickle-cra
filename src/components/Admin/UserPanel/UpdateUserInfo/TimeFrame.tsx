import React, {useState} from 'react';
import clsx from 'clsx';
import DetailsFrame from '~/components/utils/DetailsFrame';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TimeFrame: React.FC<{
  // blockOffTime: any;
  notifyStartHour?: number;
  notifyEndHour?: number;
  notifyStartMin?: number;
  notifyEndMin?: number;
  prefWeekDayIds?: string[];
  onChange: Function;
}> = props => {
  const {
    notifyStartHour = 0,
    notifyEndHour = 23,
    notifyStartMin = 0,
    notifyEndMin = 30,
    prefWeekDayIds = [],
    onChange
  } = props;

  const [timesPanelOpen, setTimesPanelOpen] = useState<boolean>(false);

  return (
    <DetailsFrame
      className="flex flex-col"
      open={timesPanelOpen}
      onClick={() => setTimesPanelOpen(!timesPanelOpen)}
      title="Preferred Notification Times">
      <p className="mb-2">Preferred notification time (Range)</p>
      <div className="flex flex-wrap mb-2">
        <section className="mb-2 mr-2">
          <label className="mb-2 label">Start:</label>
          <input
            type="number"
            className="form-control border-2"
            min="0"
            step="1"
            max="23"
            value={notifyStartHour}
            onChange={e => {
              onChange({
                notifyStartHour: e.target.value
              });
            }}
          />
          :
          <input
            type="number"
            className="form-control border-2"
            min="0"
            step="1"
            max="59"
            placeholder="00"
            value={notifyStartMin}
            onChange={e => {
              onChange({
                notifyStartMin: e.target.value
              });
            }}
          />
        </section>
        <section className="mb-2">
          <label className="mb-2 label">End:</label>
          <input
            type="number"
            className="form-control border-2"
            min={notifyEndHour || 0}
            max="23"
            value={notifyEndHour || undefined}
            onChange={e => {
              onChange({
                notifyStartMin: e.target.value
              });
            }}
          />
          :
          <input
            type="number"
            className="form-control border-2"
            min="0"
            max="59"
            value={notifyEndMin || undefined}
            onChange={e => {
              onChange({notifyEndMin: e.target.value});
            }}
          />
        </section>
      </div>
      <label className="mb-2 label">Preferred Weekdays:</ label>
      <div className="flex content-between flex-wrap">
        {WEEK_DAYS.map(d => (
          <button
            type="button"
            id={d}
            className={clsx(
              'btn border-2 p-2 m-1',
              prefWeekDayIds.includes(d) && 'bg-black text-white'
            )}
            onClick={() =>
              onChange({
                prefWeekDayIds: prefWeekDayIds.includes(d)
                  ? prefWeekDayIds.filter(e => e !== d)
                  : [d, ...prefWeekDayIds]
              })
            }>
            {d}
          </button>
        ))}
      </div>
    </DetailsFrame>
  );
};
export default TimeFrame;
