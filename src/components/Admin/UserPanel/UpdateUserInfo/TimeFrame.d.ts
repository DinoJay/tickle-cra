import React from 'react';
declare const TimeFrame: React.FC<{
    notifyStartHour?: number;
    notifyEndHour?: number;
    notifyStartMin?: number;
    notifyEndMin?: number;
    prefWeekDayIds?: string[];
    onChange: Function;
}>;
export default TimeFrame;
