import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBpFPU9QsIOMDgIZ9DeWaqh2spWeE_2S9E",
  authDomain: "digital-gram-panchayat-578c1.firebaseapp.com",
  projectId: "digital-gram-panchayat-578c1",
  storageBucket: "digital-gram-panchayat-578c1.firebasestorage.app",
  messagingSenderId: "82481413899",
  appId: "1:82481413899:web:08ccae893caedc37e6ec0e",
  measurementId: "G-MQSE8KHQ5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const now = () => serverTimestamp();

export { auth, db, now };