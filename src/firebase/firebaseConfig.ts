// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAqL1HGx3KJJMZT4rwG2VlcGknhPv4oFT0",
  authDomain: "f-salon-51786.firebaseapp.com",
  projectId: "f-salon-51786",
  storageBucket: "f-salon-51786.appspot.com",
  messagingSenderId: "16647386828",
  appId: "1:16647386828:web:d2b80eaaec25aaf3027469",
  measurementId: "G-R2LN3PYGSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);