import { Img } from './typeUtils';
export interface Avatar {
    title: string;
    id: string;
    description: string;
    img: Img;
}
export interface InternalAvatar {
    title: string;
    id: string;
    description: string;
    imgs: Img[];
}
declare const avatarDict: {
    [key: string]: InternalAvatar;
};
export declare const avatars: {
    type: string;
    id: string;
    imgs: undefined;
    img: Img;
    title: string;
    description: string;
}[];
export declare const avatarUrls: {
    [a: string]: string;
};
export default avatarDict;
