import topicIcons from '~/styles/topics';
const topix = topicIcons.map((s) => ({
    id: s.key,
    title: s.key,
    description: '',
    points: 0,
    constant: true,
    img: { url: s.src, id: s.src, name: s.key }
}));
export default topix;
