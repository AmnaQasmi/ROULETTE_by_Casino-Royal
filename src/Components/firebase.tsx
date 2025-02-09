import { initializeApp } from "firebase/app";
import { getAuth as auth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDtHXMii66Mer0VCVFYJacEw_Z78dlAHU",
  authDomain: "casinoroyal-5a363.firebaseapp.com",
  projectId: "casinoroyal-5a363",
  storageBucket: "casinoroyal-5a363.firebasestorage.app",
  messagingSenderId: "929175239737",
  appId: "1:929175239737:web:365691673a6e8bbafb21e8",
  measurementId: "G-X0P7Y5KEB4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { auth, signInWithEmailAndPassword, updateProfile };