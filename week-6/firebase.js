// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbgu8qjw6WVjsHEomqxS4ALcCVRjzITHU",
  authDomain: "week4-project-abbd0.firebaseapp.com",
  projectId: "week4-project-abbd0",
  storageBucket: "week4-project-abbd0.appspot.com",
  messagingSenderId: "787508266646",
  appId: "1:787508266646:web:6ee42a3db0053af66764b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export the auth object and any functions you need
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, firestore};