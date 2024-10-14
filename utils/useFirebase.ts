import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import app from '@/utils/Firebase';
import { firestore } from '@/utils/Firebase'; // Firestore instance
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore methods for document operations

const auth = getAuth(app);

// Interface for user data
interface UserData {
  email: string;
  displayName?: string | null; // Display name might not always be available
  photoURL?: string | null;
  createdAt: Date;
}

// Create a new user and store the data in Firestore
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await storeUserData(userCredential.user); // Store user data in Firestore
    return userCredential;
  } catch (error) {
    handleFirebaseError(error);
  }
};

// Sign in user with email and password
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    handleFirebaseError(error);
  }
};

// Sign in user with Google and store user data in Firestore
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

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    handleFirebaseError(error);
  }
};

// Store user data in Firestore
export const storeUserData = async (user: any) => {
  try {
    if (!user) {
      throw new Error("User data is undefined. Cannot store user data.");
    }

    // Firestore: Use the user's UID as the document ID in the 'users' collection
    const userRef = doc(firestore, "users", user.uid); // Firestore document reference
    
    const userSnapshot = await getDoc(userRef); // Check if user already exists in Firestore

    if (!userSnapshot.exists()) {
      const userData: UserData = {
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        createdAt: new Date(),
      };

      await setDoc(userRef, userData); // Save user data to Firestore
      console.log("User data stored successfully in Firestore");
    } else {
      console.log("User already exists, skipping data storage");
    }
  } catch (error) {
    console.error("Error storing user data in Firestore:", error);
    throw error;
  }
};

const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);

  let errorMessage = "An error occurred, please try again.";
  if (error.code === 'auth/email-already-in-use') {
    errorMessage = "This email address is already in use.";
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = "The password is invalid.";
  } else if (error.code === 'auth/user-not-found') {
    errorMessage = "No user found with this email address.";
  }

  throw new Error(errorMessage);
};
