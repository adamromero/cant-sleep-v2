// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAXAYn3exbde98F9-4Fy2AWCQ1ZWqXHqdI",
   authDomain: "can-t-sleep-d4388.firebaseapp.com",
   projectId: "can-t-sleep-d4388",
   storageBucket: "can-t-sleep-d4388.appspot.com",
   messagingSenderId: "616581401874",
   appId: "1:616581401874:web:f83bd4d83ac4dac03ff7cb",
   measurementId: "G-PCNDD6058G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
