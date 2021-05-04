import isEqual from 'lodash/isEqual';
export const userFields = ({ interests = [], uid = '', firstName, lastName, username, email, admin = false, mobileNumber = null, envIds = ['default'], ...rest }) => ({
    uid,
    interests,
    firstName,
    lastName,
    username,
    email,
    admin,
    envIds,
    mobileNumber,
    ...rest
});
export const initUserFields = {
    interests: [],
    img: null,
    // avatar: null,
    uid: '',
    firstName: null,
    lastName: null,
    username: 'exampleUserName',
    email: 'example@email.com',
    admin: false,
    mobileNumber: null,
    envIds: ['default']
};
export const compareUserFields = ({ interests: interestsA, uid: uidA, firstName: firstNameA, lastName: lastNameA, username: usernameA, email: emailA }, { interests: interestsB, firstName: firstNameB, lastName: lastNameB, uid: uidB, username: usernameB, email: emailB }) => {
    if (!isEqual(interestsA, interestsB)) {
        // console.log('interests unequal');
        return false;
    }
    if (uidA !== uidB) {
        // console.log('uid unequal');
        return false;
    }
    if (firstNameA !== firstNameB) {
        // console.log('firstName unequal');
        return false;
    }
    if (lastNameA !== lastNameB) {
        // console.log('lastName unequal')
        return false;
    }
    if (usernameA !== usernameB) {
        return false;
    }
    if (emailA !== emailB) {
        // console.log('email unequal');
        return false;
    }
    // if (passwordOneA !== passwordOneB) {
    //   // console.log('photo unequal');
    //   return false;
    // }
    // if (passwordTwoA !== passwordTwoB) {
    //   // console.log('photo unequal');
    //   return false;
    // }
    return true;
};
