import Reward from '~/constants/rewardType';
import { SoftSkill } from '~/constants/softSkillData';
import Topic from '~/constants/topicType';
import { Card } from '~/constants/cardFields';
import HelpRequest from '~/constants/HelpRequestType';
import { CardActionTypes } from './types';
export interface CardsStateType {
    cardTemplateId: string;
    collectibleCards: Card[];
    createdCards: Card[];
    rewards: Reward[];
    softSkillDict: SoftSkill[];
    topicDict: Topic[];
    tmpCard: Card & {
        template: boolean;
    };
    cards: Card[];
    helpRequests: HelpRequest[];
}
declare function reducer(state: CardsStateType | undefined, action: CardActionTypes): CardsStateType;
export default reducer;
