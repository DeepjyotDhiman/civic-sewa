// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr0v3Tk5bz9J6scEmPHNZCTvzHeIggEZg",
  authDomain: "civic-sewa-14c92.firebaseapp.com",
  projectId: "civic-sewa-14c92",
  storageBucket: "civic-sewa-14c92.appspot.com", // fixed domain
  messagingSenderId: "911554773198",
  appId: "1:911554773198:web:cb6c140e47666de4f3d09f",
};

// ✅ Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// ✅ Export services for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; // optional, in case you need the app instance

