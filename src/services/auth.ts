// src/authService.ts

import { auth } from "./db";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from "firebase/auth";

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem('user', JSON.stringify(userCredential))
    localStorage.removeItem('registerError')
    return userCredential;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    localStorage.setItem('registerError', "Error Occured Creating your Account!")
    throw error;
  }
};

// Log in with email and password
export const logIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential)
    localStorage.setItem('user', JSON.stringify(userCredential))
    localStorage.removeItem('loginError')
    return userCredential;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    localStorage.setItem('loginError', "Invalid Login Credentials!")
    throw error;
  }
};

// Log out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem('user')
    console.log("User logged out successfully");
  } catch (error: any) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};
