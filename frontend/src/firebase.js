// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdiGehrVHMuUU_53j3zgkuFJfvClduym4",
  authDomain: "trustisee.firebaseapp.com",
  projectId: "trustisee",
  storageBucket: "trustisee.appspot.com",
  messagingSenderId: "894617598973",
  appId: "1:894617598973:web:9775638a366b1bee86b794",
  measurementId: "G-MYCV9FZSGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth()
const provider= new GoogleAuthProvider()
// const analytics = getAnalytics(app);

export {auth,provider}