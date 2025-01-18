import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebase_auth } from "../firebaseConfig";

// Sign Up
export const signUp = async (email, password) => {
  try {
    const userCred = await createUserWithEmailAndPassword(firebase_auth, email, password);
    return {
      success: true,
      user: userCred.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(firebase_auth, email, password);
    return {
      success: true,
      user: userCred.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Log out the current user
export const logOut = async () => {
  try {
    await signOut(firebase_auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
