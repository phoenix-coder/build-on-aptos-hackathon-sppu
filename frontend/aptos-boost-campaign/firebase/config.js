// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2QF3Q5xKXSagp3cNpCg3rFFd8DNmBMv0",
  authDomain: "instagram-lite-41964.firebaseapp.com",
  databaseURL: "https://instagram-lite-41964.firebaseio.com",
  projectId: "instagram-lite-41964",
  storageBucket: "instagram-lite-41964.appspot.com",
  messagingSenderId: "447692955163",
  appId: "1:447692955163:web:6bdcb354b9056b88e0e2be",
  measurementId: "G-MMD6R34FLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);