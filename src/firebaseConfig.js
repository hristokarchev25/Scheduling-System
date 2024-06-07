// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT11DNUfxW_OlRCGwUEwG8prtFqmISKtA",
  authDomain: "scheduling-system-e93a1.firebaseapp.com",
  databaseURL:
    "https://scheduling-system-e93a1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "scheduling-system-e93a1",
  storageBucket: "scheduling-system-e93a1.appspot.com",
  messagingSenderId: "200394309254",
  appId: "1:200394309254:web:5021cbe984544cb6fc1b07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
