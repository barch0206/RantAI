// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD4qmXLsuYOl6FC6G0fkmKnN0EdlojNXXI",
    authDomain: "rant-ai-49f51.firebaseapp.com",
    projectId: "rant-ai-49f51",
    storageBucket: "rant-ai-49f51.firebasestorage.app",
    messagingSenderId: "1738970469",
    appId: "1:1738970469:web:a491812613645cdf75fd8c",
    measurementId: "G-W9LHJQ1NC3"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export const db = getFirestore(app);