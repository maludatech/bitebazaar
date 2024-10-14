"use client";

import { useEffect, useState } from 'react';
import { getAuth, fetchSignInMethodsForEmail, onAuthStateChanged, User, SignInMethod } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IonIcon } from '@ionic/react';
import { mailOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Spinner } from '@/components/Spinner';
import app from '@/utils/Firebase';
import { signInUser, createUser, signInWithGoogle, storeUserData } from '@/utils/useFirebase';
import Link from 'next/link';

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push('/menu');
      } else {
        console.log("No user is signed in");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsGoogleSignInLoading(true);
    try {
      const userCredential = await signInWithGoogle();
      await storeUserData(userCredential?.user); // Ensure user data is stored
      router.push('/menu');
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsGoogleSignInLoading(false);
    }
  };

  // Handle Email sign-in or sign-up
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      // Fetch sign-in methods for the email
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log("signinMethods:", signInMethods);
      
      if (signInMethods.includes(SignInMethod.GOOGLE)) {
        // If linked to Google, prompt to sign in with Google
        setErrorMessage("This email is already linked to a Google account. Please sign in with Google.");
      } else if (signInMethods.length > 0) {
        // User exists, attempt to sign in
        await signInUser(email, password);
        setSuccessMessage("Login successful!");
        router.push('/menu'); // Redirect only after successful sign-in
      } else {
        // No sign-in methods found, create a new user
        const userCredential = await createUser(email, password);
        await storeUserData(userCredential?.user);
        setSuccessMessage("Account created successfully!");
        router.push('/menu'); // Redirect after account creation
      }
    } catch (error: any) {
      handleError(error); // Handle errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: any) => {
    const messages: Record<string, string> = {
      'auth/invalid-email': "Invalid email format.",
      'auth/user-not-found': "No account found with this email.",
      'auth/wrong-password': "Incorrect password.",
      'auth/email-already-in-use': "Email is already registered.",
      'auth/operation-not-allowed': "Operation not allowed. Please use a different sign-in method.",
    };

    if (error.code === 'auth/wrong-password') {
      setErrorMessage("Incorrect password.");
    } else {
      setErrorMessage(messages[error.code] || ` ${error.message}`);
    }

    setTimeout(() => setErrorMessage(""), 3000);
  };

  return (
    <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen">
      <div className="glassmorphism max-w-96 flex flex-col gap-4 font-rubik">
        <h2 className="text-3xl font-bold mb-2">Login</h2>

        <form onSubmit={handleEmailSignIn}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 mb-2 border rounded-2xl"
            required
          />
          <div className="relative flex items-center w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 mb-4 border rounded-2xl"
              required
            />
            <IonIcon 
              icon={showPassword ? eyeOffOutline : eyeOutline} 
              className="size-5 right-4 top-4 absolute text-slate-400 hover:cursor-pointer" 
              onClick={() => setShowPassword(!showPassword)} 
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex items-center justify-center font-bold text-black p-3 rounded-full border-slate-400 border-[1px] relative hover:border-primary_color"
          >
            {isLoading ? (
              <Spinner otherStyles={""} />
            ) : (
              <div className="flex items-center justify-center">
                <IonIcon icon={mailOutline} className="size-5 text-primary_color absolute left-4" />
                <h1 className="mx-auto">Continue with Email</h1>
              </div>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="mb-2 font-medium uppercase">or</p>
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full flex items-center justify-center font-bold text-black p-3 rounded-full border-slate-400 border-[1px] hover:border-primary_color"
            disabled={isGoogleSignInLoading}
          >
            {isGoogleSignInLoading ? (
              <Spinner otherStyles={""} />
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src={"/assets/images/google-icon.jpg"}
                  alt="Google Icon"
                  width={20}
                  height={20}
                  className="left-8 absolute"
                />
                <h1 className="mx-auto">Google</h1>
              </div>
            )}
          </button>
        </div>

        {errorMessage && (
          <p className="w-full p-2 mt-2 text-sm text-red-500 text-center bg-red-300 border-red-500 border-[1px] rounded-2xl">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="w-full p-2 text-sm mt-2 text-center text-blue-500 bg-blue-300 border-blue-500 border-[1px] rounded-2xl">
            {successMessage}
          </p>
        )}

        <div className="text-center justify-center mt-2 text-[13px] flex flex-col gap-1 text-slate-500">
          <p>By creating an account, you automatically accept our</p>
          <p>
            <Link href="/terms-of-service" className="underline hover:underline-offset-2">Terms of Service</Link>, 
            <Link href="/privacy-policy" className="underline hover:underline-offset-2 px-1">Privacy Policy</Link>, 
            and 
            <Link href="/cookies-policy" className="underline hover:underline-offset-2 pl-1">Cookies Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
