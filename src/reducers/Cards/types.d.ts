import Topic from '~/constants/topicType';
import Reward from '~/constants/rewardType';
import { Card } from '~/constants/cardFields';
import ActivitySubmission from '~/constants/activitySubmissionType';
import HelpRequest from '~/constants/HelpRequestType';
export declare const RECEIVE_PLACES = "RECEIVE_PLACES";
export interface ReceivePlaces {
    type: typeof RECEIVE_PLACES;
    options: any;
}
export declare const SET_CARDS = "SET_CARDS";
export interface SetCards {
    type: typeof SET_CARDS;
    options: Card[];
}
export declare const SET_HELP_REQUESTS = "SET_HELP_REQUESTS";
export interface SetHelpRequests {
    type: typeof SET_HELP_REQUESTS;
    options: HelpRequest[];
}
export declare const RECEIVE_REWARDS = "RECEIVE_REWARDS";
export interface ReceiveRewards {
    type: typeof RECEIVE_REWARDS;
    options: Reward[];
}
export declare const DELETE_REWARD = "DELETE_REWARD";
export interface DeleteReward {
    type: typeof DELETE_REWARD;
    options: string;
}
export declare const PUT_REWARD = "PUT_REWARD";
export interface PutReward {
    type: typeof PUT_REWARD;
    options: Reward;
}
export declare const RECEIVE_COLLECTIBLE_CARDS = "RECEIVE_COLLECTIBLE_CARDS";
export interface ReceiveCollectibleCards {
    type: typeof RECEIVE_COLLECTIBLE_CARDS;
    options: Card[];
}
export declare const RECEIVE_CREATED_CARDS = "RECEIVE_CREATED_CARDS";
export interface ReceiveCreatedCards {
    type: typeof RECEIVE_CREATED_CARDS;
    options: Card[];
}
export declare const UPDATE_CARD = "UPDATE_CARD";
export interface UpdateCard {
    type: typeof UPDATE_CARD;
    options: object;
}
export declare const REMOVE_ACTIVITY_SUB = "REMOVE_ACTIVITY_SUB";
export interface RemoveActivitySub {
    type: typeof REMOVE_ACTIVITY_SUB;
    options: {
        uid: string;
        id: string;
    };
}
export declare const SUCCESS_UPDATE_CARD = "SUCCESS_UPDATE_CARD";
export interface UpdateCardSuccess {
    type: typeof SUCCESS_UPDATE_CARD;
}
export declare const ERROR_UPDATE_CARD = "ERROR_UPDATE_CARD";
export interface UpdateCardError {
    type: typeof ERROR_UPDATE_CARD;
}
export declare const CREATE_CARD = "CREATE_CARD";
export interface CreateCard {
    type: typeof CREATE_CARD;
    options: Card;
}
export declare const SEE_CARD = "SEE_CARD";
export interface SeeCard {
    type: typeof SEE_CARD;
    options: string;
}
export declare const SUCCESS_CREATE_CARD = "SUCCESS_CREATE_CARD";
export interface CreateCardSuccess {
    type: typeof SUCCESS_CREATE_CARD;
}
export declare const ERROR_CREATE_CARD = "ERROR_CREATE_CARD";
export interface CreateCardError {
    type: typeof ERROR_CREATE_CARD;
}
export declare const DELETE_CARD = "DELETE_CARD";
export interface DeleteCard {
    type: typeof DELETE_CARD;
    options: string;
}
export declare const SUCCESS_DELETE_CARD = "SUCCESS_DELETE_CARD";
export interface DeleteCardSuccess {
    type: typeof SUCCESS_DELETE_CARD;
}
export declare const ERROR_DELETE_CARD = "ERROR_DELETE_CARD";
export interface DeleteCardError {
    type: typeof ERROR_DELETE_CARD;
}
export declare const SET_CARD_TEMPLATE = "SET_CARD_TEMPLATE";
export interface SetCardTemplate {
    type: typeof SET_CARD_TEMPLATE;
    options: Card;
}
export declare const UPDATE_CARD_TEMPLATE = "UPDATE_CARD_TEMPLATE";
export interface UpdateCardTemplate {
    type: typeof UPDATE_CARD_TEMPLATE;
    options: Card;
}
export declare const SUBMIT_ACTIVITY = "SUBMIT_ACTIVITY";
export interface SubmitActivity {
    type: typeof SUBMIT_ACTIVITY;
    options: ActivitySubmission;
}
export declare const SUBMIT_ACTIVITY_SUCCESS = "SUBMIT_ACTIVITY_SUCCESS";
export interface SubmitActivitySuccess {
    type: typeof SUBMIT_ACTIVITY_SUCCESS;
}
export declare const DELETE_TOPIC = "DELETE_TOPIC";
export interface DeleteTopic {
    type: typeof DELETE_TOPIC;
    options: string;
}
export declare const RECEIVE_TOPICS = "RECEIVE_TOPICS";
export interface ReceiveTopics {
    type: typeof RECEIVE_TOPICS;
    options: Topic[];
}
export declare const PUT_TOPIC = "PUT_TOPIC";
export interface PutTopic {
    type: typeof PUT_TOPIC;
    options: Topic;
}
export declare type CardActionTypes = PutTopic | SeeCard | ReceivePlaces | UpdateCardError | ReceiveTopics | DeleteTopic | SubmitActivity | SubmitActivitySuccess | UpdateCard | UpdateCardSuccess | UpdateCardTemplate | DeleteCardError | DeleteCardSuccess | CreateCard | CreateCardError | CreateCardSuccess | ReceivePlaces | SetCards | PutReward | DeleteReward | ReceiveRewards | SetCardTemplate | ReceiveCollectibleCards | ReceiveCreatedCards | DeleteCard | RemoveActivitySub | SetHelpRequests;
