// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPaHBPcyCMB3lZzncrnrrT5QPzTCIheQw",
  authDomain: "movie-gallery-app-514d2.firebaseapp.com",
  projectId: "movie-gallery-app-514d2",
  storageBucket: "movie-gallery-app-514d2.appspot.com",
  messagingSenderId: "590025499969",
  appId: "1:590025499969:web:97cc060efe443d17d42dc0",
  measurementId: "G-KMZMXYSZN0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
