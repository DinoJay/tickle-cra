import communication from './communication.svg';
import leadership from './leadership.svg';
import responsibility from './responsibility.svg';
import teamwork from './teamwork.svg';
import selfMotivation from './self_motivation.svg';
import timeManagement from './time_management.svg';
export { communication, leadership, responsibility, teamwork, selfMotivation, timeManagement };
const dict = {
    communication,
    leadership,
    responsibility,
    teamwork,
    selfMotivation,
    timeManagement
};
const softSkillList = Object.keys(dict).map(k => ({
    // TODO remove key
    key: k,
    id: k,
    src: dict[k]
}));
export default softSkillList;
