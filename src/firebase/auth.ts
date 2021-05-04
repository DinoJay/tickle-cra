import {auth} from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
): Promise<unknown> =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<unknown> => auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = (): void => {
  localStorage.clear();
  auth.signOut();
};

// Password Reset
export const doPasswordReset = (email: string): Promise<void> =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (
  password: string
): Promise<void> | null =>
  auth.currentUser && auth.currentUser.updatePassword(password);

export const doEmailUpdate = (email: string): Promise<void> | null =>
  auth.currentUser && auth.currentUser.updateEmail(email);

export const getEmail = (): string | null =>
  auth.currentUser && auth.currentUser.email;
// export const getUserProfile = auth.currentUser;
//
// export const updateUserProfile = userProfile =>
//   auth.currentUser.updateProfile(userProfile);

export const getUserInfo = (): unknown => auth.currentUser;
