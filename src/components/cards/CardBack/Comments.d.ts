import React from 'react';
import { User } from '~/constants/userFields';
/**
 * Component to fetch data for CommentList
 */
declare const CommentsWrapper: React.FC<{
    author: User;
    cardId: string;
    addComment: Function;
    extended: boolean;
    userEnvId: string;
}>;
export default CommentsWrapper;
