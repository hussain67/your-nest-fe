// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyC9hWNL-kDUrCkjBBuDjpDhiquz7wRtFT0",
	authDomain: "your-nest-app.firebaseapp.com",
	projectId: "your-nest-app",
	storageBucket: "your-nest-app.appspot.com",
	messagingSenderId: "81100478097",
	appId: "1:81100478097:web:f6757080fedcd6fd075130"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
