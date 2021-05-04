import React from 'react';
import Activity from '~/constants/activityType';
declare const HangmanAuthor: React.FC<{
    className?: string;
    toggleUserview: (a: boolean) => any;
    style?: React.CSSProperties;
    onChange: Function;
    activity: Activity;
}>;
export default HangmanAuthor;
