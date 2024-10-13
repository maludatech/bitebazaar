import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Datastore } from "@google-cloud/datastore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase, check if an app already exists
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export default app;

// Initialize Datastore client
const datastore = new Datastore({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID // Same project ID used in Firebase
});

export { datastore };
