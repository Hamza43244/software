// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZPwNUfBQDPITt4gH9xmu1deGHZJJ696k",
  authDomain: "react-boilerplate-156e3.firebaseapp.com",
  projectId: "react-boilerplate-156e3",
  storageBucket: "react-boilerplate-156e3.appspot.com",
  messagingSenderId: "1083924487062",
  appId: "1:1083924487062:web:6b86caa9bdab76d7421bb7",
  measurementId: "G-C1NG93XGMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;