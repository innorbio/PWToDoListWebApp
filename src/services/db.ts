// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyAdlg9iiNVf4Kq4L-5X6diKu4xOpha8wfM",

  authDomain: "pwtodolistwebapp.firebaseapp.com",

  projectId: "pwtodolistwebapp",

  storageBucket: "pwtodolistwebapp.appspot.com",

  messagingSenderId: "760662179983",

  appId: "1:760662179983:web:112365ce9233c2141df0fa",

  measurementId: "G-VQ4VP6M8S7"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getDatabase(app);