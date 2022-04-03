
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtgp_JaHbHWxnGqkg04uMmVuLH61Z1pkg",
  authDomain: "ukvibes-160b2.firebaseapp.com",
  projectId: "ukvibes-160b2",
  storageBucket: "ukvibes-160b2.appspot.com",
  messagingSenderId: "415292564029",
  appId: "1:415292564029:web:8630eaa236c423a1454054",
  measurementId: "G-728FFVDYH9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }