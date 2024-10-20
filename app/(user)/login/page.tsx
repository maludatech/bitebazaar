"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { IonIcon } from '@ionic/react';
import { mailOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Spinner } from '@/components/Spinner';
import { useAuthContext } from '@/context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();
  const {user, dispatch} = useAuthContext();

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (user && isLoggedIn) {
    router.push('/menu');
    }
  }, [user, router]);

  // Handle Email sign-in
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.error("Error signing in:", error);
      setErrorMessage(error.message);
      setTimeout(()=>setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen">
      <div className="glassmorphism_login max-w-96 flex flex-col gap-4 font-rubik">
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
