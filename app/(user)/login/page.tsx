"use client";

import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IonIcon } from '@ionic/react';
import { mailOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Spinner } from '@/app/components/Spinner';
import app from '@/app/utils/Firebase';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleSignInLoading , setIsGoogleSignInLoading ] = useState<boolean>(false);

  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    router.replace("/menu")
  }

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsGoogleSignInLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirect after successful login
    } catch (error) {
      console.error("Google sign-in error", error);
    }finally{
      setIsGoogleSignInLoading(false);
    }
  };

  // Handle Email sign-in or sign-up
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Check if the email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        // If the email exists, sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/menu');
      } else {
        // If the email doesn't exist, sign up the user
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/menu');
      }
    } catch (error) {
      console.error("Authentication error", error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      {showModal && (
        <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen">
          <div className="glassmorphism max-w-96 font-rubik">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            
            <form onSubmit={handleEmailSignIn} className="mb-4">
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 mb-2 border rounded-2xl"
                required
              />
              <div className='relative flex items-center w-full'>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full p-3 mb-4 border rounded-2xl"
                  required
                />
                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} className='size-5 right-4 top-4 absolute text-slate-400 hover:cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>
              </div>
              <button 
                type="submit" 
                className="w-full flex items-center justify-center font-bold text-black p-3 rounded-full border-slate-400 border-[1px] relative hover:bg-slate-200"
              >
                <IonIcon icon={mailOutline} className='size-5 text-green-700'/>
                <h1 className='mx-auto'>Continue with Email</h1>
              </button>
            </form>

            <div className="text-center">
              <p className="mb-2 font-medium uppercase">or</p>
              <button 
                onClick={handleGoogleSignIn} 
                className="w-full flex items-center font-bold text-black p-3 rounded-full border-slate-400 border-[1px]  hover:bg-slate-200"
                disabled={isGoogleSignInLoading}
              >
                {isGoogleSignInLoading ? 
                <Spinner otherStyles={""}/> :
                <div className='relative'>
                  <Image
                    src={"/assets/images/google-icon.jpg"}
                    alt='google icon'
                    width={20}
                    height={20}
                  />
                  <h1 className='mx-auto'>Google</h1>
                </div>
                }
              </button>
            </div>
            
            <div className='text-center justify-center mt-8 text-[13px] flex flex-col gap-1 text-slate-500'>
                <p>By creating an account, you automatically accept our</p>
                <p className=''>
                    <Link href={"/terms-of-service"} className='underline hover:underline-offset-2'>Terms of Service,</Link>
                    <Link href={"/privacy-policy"} className='underline hover:underline-offset-2 pr-1'>Privacy Policy</Link>
                    and
                    <Link href={"/cookies-policy"} className='underline hover:underline-offset-2 pl-1'>Cookies Policy</Link>
                </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Login;
