import isEqual from 'lodash/isEqual';
import {Img} from './typeUtils';
import {Card} from '~/constants/cardFields';
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

export const userFields = ({
  interests = [],
  uid = '',
  firstName,
  lastName,
  username,
  email,
  admin = false,
  mobileNumber = null,
  envIds = ['default'],
  ...rest
}: User): User => ({
  uid,
  interests,
  firstName,
  lastName,
  username,
  email,
  admin,
  envIds,
  mobileNumber,
  ...rest
});

export const initUserFields: User = {
  interests: [],
  img: null,
  // avatar: null,
  uid: '',
  firstName: null,
  lastName: null,
  username: 'exampleUserName',
  email: 'example@email.com',
  admin: false,
  mobileNumber: null,
  envIds: ['default']
};

export const compareUserFields = (
  {
    interests: interestsA,
    uid: uidA,
    firstName: firstNameA,
    lastName: lastNameA,
    username: usernameA,
    email: emailA
  }: User,
  {
    interests: interestsB,
    firstName: firstNameB,
    lastName: lastNameB,
    uid: uidB,
    username: usernameB,
    email: emailB
  }: User
) => {
  if (!isEqual(interestsA, interestsB)) {
    // console.log('interests unequal');
    return false;
  }
  if (uidA !== uidB) {
    // console.log('uid unequal');
    return false;
  }
  if (firstNameA !== firstNameB) {
    // console.log('firstName unequal');
    return false;
  }
  if (lastNameA !== lastNameB) {
    // console.log('lastName unequal')
    return false;
  }
  if (usernameA !== usernameB) {
    return false;
  }
  if (emailA !== emailB) {
    // console.log('email unequal');
    return false;
  }
  // if (passwordOneA !== passwordOneB) {
  //   // console.log('photo unequal');
  //   return false;
  // }
  // if (passwordTwoA !== passwordTwoB) {
  //   // console.log('photo unequal');
  //   return false;
  // }
  return true;
};

export type ExtendedUser = User & {
  createdCards: Card[];
  collectedCards: Card[];
};
