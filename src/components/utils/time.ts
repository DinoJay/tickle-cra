import {timeParse, timeFormat} from 'd3-time-format';

export const parseTime = timeParse('%Y-%m-%dT%H:%M');
export const formatTime = timeFormat('%d/%m/%Y, %H:%Mh'); // DD/MM/YYYY HH:MM
export const revertParseTime = timeParse('%d/%m/%Y, %H:%Mh');
export const formatDay = timeFormat('%d/%m/%Y'); // DD/MM/YYYY HH:MM
export const parseDay = timeParse('%d/%m/%Y'); // DD/MM/YYYY HH:MM
