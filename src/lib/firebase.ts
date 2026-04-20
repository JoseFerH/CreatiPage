import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Initialize Auth lazily or conditionally to avoid server-side initialization errors when env vars are missing during build.
// Firebase Auth requires API key, which might not be present during static generation.
let auth: ReturnType<typeof getAuth>;
if (typeof window !== "undefined" && firebaseConfig.apiKey) {
  auth = getAuth(app);
} else {
  // Provide a dummy object for server-side rendering to prevent immediate crashes,
  // though auth should ideally only be used on the client.
  auth = {} as ReturnType<typeof getAuth>;
}

export { app, db, auth };
