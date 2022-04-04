// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtgp_JaHbHWxnGqkg04uMmVuLH61Z1pkg",
  authDomain: "ukvibes-160b2.firebaseapp.com",
  projectId: "ukvibes-160b2",
  storageBucket: "ukvibes-160b2.appspot.com",
  messagingSenderId: "415292564029",
  appId: "1:415292564029:web:8630eaa236c423a1454054",
  measurementId: "G-728FFVDYH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage()

 const auth = getAuth(); // export permite utilizar o auth em diferentes ficheiros, só precisamos de importar nos files  

export { app, db, auth, storage } //ou também podesmo fazer o export desta forma