// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Bbg1JU_F-JKpKRbJipcm4iksBAXNuCI",
  authDomain: "interprep-854e7.firebaseapp.com",
  projectId: "interprep-854e7",
  storageBucket: "interprep-854e7.firebasestorage.app",

  messagingSenderId: "339102105040",
  appId: "1:339102105040:web:7d2d9a7e5d8319e0184dd5",
  measurementId: "G-SP25VM7TSS"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();

export const auth =getAuth(app)

export const db = getFirestore(app)