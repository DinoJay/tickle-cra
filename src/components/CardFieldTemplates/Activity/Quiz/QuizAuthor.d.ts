import React from 'react';
import Activity from '~/constants/activityType';
import { Img } from '~/constants/typeUtils';
export declare type Answer = {
    id: string;
    order: number;
    correct: boolean;
    text: string;
};
export declare type Question = {
    text: string;
    id: string;
    order: number;
    wellFormatted: boolean;
    img?: Img;
    answers: Answer[];
};
declare const QuizAuthor: React.FC<{
    className?: string;
    style?: React.CSSProperties;
    toggleUserview: Function;
    onChange: Function;
    activity: Activity;
}>;
export default QuizAuthor;
