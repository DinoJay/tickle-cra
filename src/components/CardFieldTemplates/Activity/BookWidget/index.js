import React from 'react';
import { BOOKWIDGET } from '~/constants/cardFields';
import { ModalContent, Preview } from './BookWidgetAuthor';
import BookWidgetChallenge from './BookWidgetChallenge';
export const type = BOOKWIDGET;
export const label = 'BookWidget';
export const View = BookWidgetChallenge;
export const Results = () => (
// const {todo} = props;
React.createElement("div", null, "TODO"));
export { ModalContent, Preview };
