import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2fuVpp7Tohv678HLV4HWebTOdcl1Z0Dw",
  authDomain: "breakboundaries-f45c9.firebaseapp.com",
  projectId: "breakboundaries-f45c9",
  storageBucket: "breakboundaries-f45c9.firebasestorage.app",
  messagingSenderId: "549377800971",
  appId: "1:549377800971:web:02b7339150433f6703000e",
  measurementId: "G-C1413T468L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics };
