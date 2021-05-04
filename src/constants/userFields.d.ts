import { Img } from './typeUtils';
import { Card } from '~/constants/cardFields';
import Topic from '~/constants/topicType';
export interface Interest {
    constant?: boolean;
    description: string | null;
    id: string;
    img: {
        url: string;
    };
    title: string;
}
export interface Aim {
    constant?: boolean;
    description: string | null;
    id: string;
    img: {
        url: string;
    };
    title: string;
}
export interface Deficit {
    description: string | null;
    id: string;
    img: {
        url: string;
    };
    title: string;
}
export interface PersonalityTraits {
    openness: number;
    conscientiousness: number;
    agreeableness: number;
    neuroticism: number;
    emotionalStability: number;
    extrovert: number;
    player: number;
    introvert: number;
}
export interface User {
    img: Img | null;
    avatar?: string;
    interests: Topic[];
    aims?: Topic[];
    deficits?: Topic[];
    uid: string;
    firstName: string | null;
    lastName: string | null;
    username: string;
    email: string;
    prefWeekDayIds?: string[];
    notifyStartHour?: number[];
    notifyEndHour?: number;
    notifyStartMin?: number;
    notifyEndMin?: number;
    admin: boolean;
    envIds: string[];
    mobileNumber: string | null;
    tmp?: boolean;
    msg?: string;
    firebaseMessagingToken?: string;
    photoURL?: string;
}
export declare const userFields: ({ interests, uid, firstName, lastName, username, email, admin, mobileNumber, envIds, ...rest }: User) => User;
export declare const initUserFields: User;
export declare const compareUserFields: ({ interests: interestsA, uid: uidA, firstName: firstNameA, lastName: lastNameA, username: usernameA, email: emailA }: User, { interests: interestsB, firstName: firstNameB, lastName: lastNameB, uid: uidB, username: usernameB, email: emailB }: User) => boolean;
export declare type ExtendedUser = User & {
    createdCards: Card[];
    collectedCards: Card[];
};
