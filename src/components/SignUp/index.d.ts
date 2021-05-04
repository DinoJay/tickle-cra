import React from 'react';
import Topic from '~/constants/topicType';
declare const SignUpForm: React.FC<{
    history: any;
    admin: boolean;
    signUp: Function;
    updateAuthUser: Function;
    userEnvId: string;
    className: string;
    fetchTopics: Function;
    topicDict: Topic[];
} | any>;
declare const SignUpLink: ({ userEnv }: {
    userEnv: string;
}) => JSX.Element;
declare const _default: React.ComponentClass<unknown, any>;
export default _default;
export { SignUpForm, SignUpLink };
