import React from 'react';
import Activity from '~/constants/activityType';
import { ModalProps } from '~/components/utils/Modal';
import AuthUser from '~/constants/authUserType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import { Match } from '~/constants/typeUtils';
export declare const activityComps: {
    [key: string]: any;
};
export declare const getActivityCompView: React.FC;
export declare const key = "activity";
export declare const label = "Activity";
export declare const View: React.FC<{
    activity: Activity;
    modalProps: ModalProps;
}>;
interface ModalContentType extends Match {
    disabled: boolean;
    activity: Activity;
    modalProps: ModalProps;
    onChange: Function;
    onClose: Function;
    activitySubmission: ActivitySubmission;
    authUser: AuthUser;
    addToStorage: Function;
    removeFromStorage: Function;
    id: string;
    addActivitySubmission: (a: any) => any;
    onSubmit: Function;
}
export declare const ModalContent: React.FC<ModalContentType>;
export declare const Preview: React.FC<{
    activity: Activity;
    onClick: Function;
}>;
export {};
