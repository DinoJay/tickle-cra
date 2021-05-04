export default function topicDb(userEnvStr: string): {
    doCreateTopic: Function;
    doReadTopics: Function;
    doDeleteTopic: Function;
};
