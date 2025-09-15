import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr0v3Tk5bz9J6scEmPHNZCTvzHeIggEZg",
  authDomain: "civic-sewa-14c92.firebaseapp.com",
  projectId: "civic-sewa-14c92",
  storageBucket: "civic-sewa-14c92.firebasestorage.app",
  messagingSenderId: "911554773198",
  appId: "1:911554773198:web:cb6c140e47666de4f3d09f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth & db
export const auth = getAuth(app);
export const db = getFirestore(app);

