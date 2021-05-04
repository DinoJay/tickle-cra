import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { Card } from '~/constants/cardFields';
import AppStateType from '~/reducers/appStateType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import Topic from '~/constants/topicType';
import Reward from '~/constants/rewardType';
import HelpRequest from '~/constants/HelpRequestType';
declare type ThunkType = ThunkAction<void, AppStateType, null, Action<string>>;
/**
 * fetches collectible cards for one user
 * @param {string} uid for user
 * @returns {string} user environment id
 */
export declare type FetchCollectibleCardsType = (a: {
    uid: string;
    userEnvId: string;
}) => any;
export declare function fetchCollectibleCards({ uid, userEnvId }: {
    uid: string;
    userEnvId: string;
}): ThunkType;
export declare type FetchHelpRequests = (a: {
    uid: string;
    userEnvId: string;
}) => any;
export declare function fetchHelpRequests({ uid, userEnvId }: {
    uid: string;
    userEnvId: string;
}): ThunkType;
export declare type AddHelpRequest = (a: {
    helpRequest: HelpRequest;
    userEnvId: string;
}) => any;
export declare function addHelpRequest({ userEnvId, helpRequest }: {
    helpRequest: HelpRequest;
    userEnvId: string;
}): ThunkType;
export declare type FetchCardTemplatesType = (a: {
    uid: string;
    userEnvId: string;
}) => any;
export declare function fetchCardTemplates(userEnvId: string): ThunkType;
export declare type FetchAllCardWithSubmissionType = (userEnvId: string) => any;
export declare function fetchAllCardsWithSubmissions(userEnvId: string): ThunkType;
export declare type FetchAllCardsType = (userEnvId: string) => any;
export declare function fetchAllCards(userEnvId: string): ThunkType;
export declare type AsyncCreateCardType = (a: {
    cardData: Card;
    userEnvId: string;
}) => any;
export declare const asyncCreateCard: ({ cardData, userEnvId }: {
    cardData: Card;
    userEnvId: string;
}) => (dispatch: Function) => Promise<void>;
export declare type AsyncRemoveCardType = (a: {
    cardId: string;
    userEnvId: string;
}) => any;
export declare const asyncRemoveCard: AsyncRemoveCardType;
export declare type AsyncUpdateCardType = (arg: {
    cardData: Card;
    userEnvId: string;
}) => any;
export declare const asyncUpdateCard: AsyncUpdateCardType;
export declare const asyncRemoveActivitySub: any;
export declare const asyncUpdateCardTemplate: AsyncUpdateCardType;
export declare type AddActivitySubmissionType = (activitySubmission: ActivitySubmission, userEnvId: string) => any;
export declare const addActivitySubmission: AddActivitySubmissionType;
export declare type UpdateTopicType = (topic: Topic, userEnv: string) => any;
export declare const updateTopic: (topic: Topic, userEnv: string) => (dispatch: Function) => Promise<void>;
export declare type RemoveTopicType = (topicId: string, userEnv: string) => any;
export declare const removeTopic: RemoveTopicType;
export declare type FetchTopicsType = (userEnv: string) => any;
export declare const fetchTopics: FetchTopicsType;
export declare type FetchRewardsType = (userEnv: string) => any;
export declare const fetchRewards: FetchRewardsType;
export declare type UpdateRewardType = (reward: Reward, userEnv: string) => any;
export declare function updateReward(reward: Reward, userEnv: string): ThunkType;
export declare type RemoveRewardType = (rewardId: string, userEnv: string) => any;
export declare const removeReward: RemoveRewardType;
export {};
