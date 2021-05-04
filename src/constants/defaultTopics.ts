import topicIcons from '~/styles/topics';
import Topic from '~/constants/topicType';

const topix: Topic[] = topicIcons.map(
  (s: {key: string; src: string}) => ({
    id: s.key,
    title: s.key,
    description: '',
    points:0,
    constant: true,
    img: {url: s.src, id: s.src, name: s.key}
  })
);

export default topix;
