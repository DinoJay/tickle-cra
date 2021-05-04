import softSkillIcons from '~/styles/soft-skills';
import {Img} from './typeUtils';

export interface SoftSkill {id: string; title: string; img: Img};

const softSkillMap = softSkillIcons.map(
  (s: {
    key: string;
    src: string;
  }): SoftSkill => ({
    id: s.key,
    title: s.key,
    img: {url: s.src, id: s.src, name: s.src}
  })
);

export default softSkillMap;
