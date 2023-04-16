// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0eaMhgm6MQm2yzrk_CTMid6cYbnZD35U",
  authDomain: "laundry-app-b0f98.firebaseapp.com",
  projectId: "laundry-app-b0f98",
  storageBucket: "laundry-app-b0f98.appspot.com",
  messagingSenderId: "115534737464",
  appId: "1:115534737464:web:41f74014410ab8f434f6cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore()

export { auth, db }