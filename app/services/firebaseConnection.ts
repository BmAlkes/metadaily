// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "newhabit-14ee6.firebaseapp.com",
  projectId: "newhabit-14ee6",
  storageBucket: "newhabit-14ee6.appspot.com",
  messagingSenderId: "821155217766",
  appId: "1:821155217766:web:e4c68a2068eccbee69c8a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
