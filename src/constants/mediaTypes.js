import { AlignLeft, Image, Film } from 'react-feather';
export const GIF = 'gif';
export const TEXT = 'Text';
export const VIDEO = 'Video';
export const IMG = 'Image';
export const URL = 'url';
export const USER_CONTENT = 'USER_CONTENT';
export const mediaTypes = [GIF, TEXT, VIDEO, IMG, URL];
const dict = {
    [TEXT]: AlignLeft,
    [IMG]: Image,
    [GIF]: Image,
    [VIDEO]: Film
};
export const mediaScale = (k) => dict[k];
