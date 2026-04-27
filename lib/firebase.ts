import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDsBrkJGJlEXdDbWUwozk4u0GfmA15NXaU",
  authDomain: "synkloom.firebaseapp.com",
  projectId: "synkloom",
  storageBucket: "synkloom.firebasestorage.app",
  messagingSenderId: "743519644505",
  appId: "1:743519644505:web:3e2421f1cd82cb6ab4ba48",
  measurementId: "G-2J9ERNPG18"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Analytics is client-side only
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, googleProvider, analytics };
