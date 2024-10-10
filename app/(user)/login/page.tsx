"use client";

import { useState } from 'react';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  fetchSignInMethodsForEmail 
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IonIcon } from '@ionic/react';
import { mailOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Spinner } from '@/components/Spinner';
import app from '@/utils/Firebase';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    router.replace("/menu");
  }

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsGoogleSignInLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push('/menu'); // Redirect after successful login
    } catch (error: any) {
      // Display the error message
      setErrorMessage(`Google sign-in failed: ${error.message}`);
    } finally {
      setIsGoogleSignInLoading(false);
    }
  };

  // Handle Email sign-in or sign-up
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Login successful!");
        setTimeout(() =>setSuccessMessage(""),3000);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Account created successfully!");
        setTimeout(() =>setSuccessMessage(""),3000);
      }
      router.push('/menu');
    } catch (error: any) {
      // Check for specific error codes and display user-friendly messages
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage("Invalid email format.");
          setTimeout(() =>setErrorMessage(""),3000);
          break;
        case 'auth/user-not-found':
          setErrorMessage("No account found with this email.");
          setTimeout(() =>setErrorMessage(""),3000);
          break;
        case 'auth/wrong-password':
          setErrorMessage("Incorrect password.");
          setTimeout(() =>setErrorMessage(""),3000);
          break;
        case 'auth/email-already-in-use':
          setErrorMessage("Email is already registered.");
          setTimeout(() =>setErrorMessage(""),3000);
          break;
        default:
          setErrorMessage(`Authentication error: ${error.message}`);
          setTimeout(() =>setErrorMessage(""),3000);
      }
    } finally {
      setIsLoading(false);
    }
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
            className="w-full flex items-center justify-center font-bold text-black p-3 rounded-full border-slate-400 border-[1px] relative hover:bg-slate-200"
          >
            {isLoading ? (
              <Spinner otherStyles={""} />
            ) : (
              <div className="flex items-center justify-center">
                <IonIcon icon={mailOutline} className="size-5 text-green-700 absolute left-4" />
                <h1 className="mx-auto">Continue with Email</h1>
              </div>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="mb-2 font-medium uppercase">or</p>
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full flex items-center justify-center font-bold text-black p-3 rounded-full border-slate-400 border-[1px] hover:bg-slate-200"
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
          <p className="w-full p-2 text-sm text-red-500 bg-red-300 border-red-500 border-[1px] rounded-2xl">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="w-full p-2 text-sm text-blue-500 bg-blue-300 border-blue-500 border-[1px] rounded-2xl">
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
