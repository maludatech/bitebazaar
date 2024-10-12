import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import app from '@/utils/Firebase';
import { db } from '@/utils/Firebase';

const auth = getAuth(app);

// Interface for user data
interface UserData {
  email: string;
  displayName?: string | null; // Display name might not always be available
  photoURL?: string | null;
  createdAt: Date;
}

export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await storeUserData(userCredential.user);
    return userCredential;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await storeUserData(result.user); // Store user data after Google sign-in
    return result;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const storeUserData = async (user: any) => {
  try {
    if (!user) {
      throw new Error("User data is undefined. Cannot store user data.");
    }
    
    const userData: UserData = {
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null, // Optionally include photo URL
      createdAt: new Date(),
    };

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    // Only create a new document if the user doesn't already exist
    if (!userDoc.exists()) {
      await setDoc(userDocRef, userData);
      console.log("User data stored successfully");
    } else {
      console.log("User already exists, skipping data storage");
    }
  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;
  }
};

const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);
  
  // Improve error handling
  let errorMessage = "An error occurred, please try again.";
  if (error.code === 'auth/email-already-in-use') {
    errorMessage = "This email address is already in use.";
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = "The password is invalid.";
  } else if (error.code === 'auth/user-not-found') {
    errorMessage = "No user found with this email address.";
  }

  // You can throw an error or display it in your UI
  throw new Error(errorMessage);
};
