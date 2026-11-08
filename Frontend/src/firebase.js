import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "import.env.meta.VITE_FIREBASE_API_KEY",
  authDomain: "automation-ai-22697.firebaseapp.com",
  projectId: "automation-ai-22697",
  storageBucket: "automation-ai-22697.firebasestorage.app",
  messagingSenderId: "162843286866",
  appId: "1:162843286866:web:f9c90c4395a02ba3d2ae8b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()