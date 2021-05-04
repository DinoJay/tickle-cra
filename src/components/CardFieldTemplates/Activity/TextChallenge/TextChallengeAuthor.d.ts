import React from 'react';
import Activity from '~/constants/activityType';
declare const TextChallengeAuthor: React.FC<{
    className?: string;
    toggleUserview: Function;
    style?: React.CSSProperties;
    onChange: Function;
    activity: Activity;
}>;
export default TextChallengeAuthor;
