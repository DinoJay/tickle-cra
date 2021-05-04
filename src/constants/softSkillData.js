import softSkillIcons from '~/styles/soft-skills';
;
const softSkillMap = softSkillIcons.map((s) => ({
    id: s.key,
    title: s.key,
    img: { url: s.src, id: s.src, name: s.src }
}));
export default softSkillMap;
