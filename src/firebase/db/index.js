import { storageRef } from '../firebase';
export const removeFromStorage = (path) => {
    const imgRef = storageRef.child(path);
    return imgRef.delete().catch(error => {
        throw new Error(`error in deleting file ${path} ${error}`);
    });
};
export const addToStorage = ({ file, path }) => {
    const imgRef = storageRef.child(`${path}`);
    return imgRef.put(file).then(() => imgRef.getDownloadURL());
};
