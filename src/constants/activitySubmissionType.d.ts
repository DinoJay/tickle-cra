export default interface ActivitySubmission {
    id: string;
    uid: string;
    completed: boolean;
    response: any;
    feedback?: any;
    succeeded: boolean;
    username: string;
    type: string;
    date: any;
}
