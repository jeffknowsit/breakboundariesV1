
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDelZgxHY32_PJGDdrPtTGa3Xg2eXmIqq0",
  authDomain: "breakingboundaries-ead58.firebaseapp.com",
  projectId: "breakingboundaries-ead58",
  storageBucket: "breakingboundaries-ead58.firebasestorage.app",
  messagingSenderId: "425225318604",
  appId: "1:425225318604:web:1ba92fb232637089715269",
  measurementId: "G-EQLP6KFJSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
