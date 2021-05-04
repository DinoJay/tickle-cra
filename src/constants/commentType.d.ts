export default interface Comment {
    text: string;
    id: string;
    username: string;
    avatar?: string;
    uid: string;
    date: Date;
    url?: string;
}
