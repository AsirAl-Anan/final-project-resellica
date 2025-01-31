// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBga_c0wXKVWtSRoSMieqTCwOOZPacOvdE",
  authDomain: "resellica.firebaseapp.com",
  projectId: "resellica",
  storageBucket: "resellica.firebasestorage.app",
  messagingSenderId: "414194794977",
  appId: "1:414194794977:web:6889a8d538ea13c46e52a0",
  measurementId: "G-BLDTCZPZ9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
