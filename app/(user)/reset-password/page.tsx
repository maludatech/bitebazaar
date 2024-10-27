"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Spinner } from '@/components/Spinner';
import { useAuthContext } from '@/context/AuthContext';


const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const router = useRouter();
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (user && isLoggedIn) {
      router.push('/menu');
    }
  }, [user, router]);


  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await fetch("/api/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),
        });
  
        const result = await response.json();
        if (!response.ok) {
          setErrorMessage(result.message || "An error occurred");
          setTimeout(() => setErrorMessage(""), 3000);
        } else {
          setSuccessMessage(result.message || "Password reset email sent!");
          setTimeout(() => setSuccessMessage(""), 3000);
          router.replace("/restore-password");
        }
      } catch (error) {
        setErrorMessage("An error occurred");
        setTimeout(() => setErrorMessage(""), 3000);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen">
      <div className="glassmorphism_login body-container w-full lg:max-w-[36rem] flex flex-col gap-4 font-rubik">
        <h2 className="text-3xl font-bold text-primary_color">Forgot Password</h2>
        <h1 className="text-[13px] font-bold text-[#444444]">
            Enter your email address, and we'll send you instructions on how to reset your password.
            Please check your inbox for the email, and if you don't see it, be sure to look in your spam or junk folder.
        </h1>

        <form onSubmit={handleEmailSignIn} className='flex flex-col gap-2'>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 mb-2 border rounded-2xl"
            required
          />
          <button 
            type="submit" 
            className="w-full flex items-center justify-center font-bold text-secondary_color p-3 rounded-full bg-primary_color relative hover:opacity-90"
          >
            {isLoading ? (
              <Spinner otherStyles={""} />
            ) : (
                <h1 className="mx-auto">Login with Email</h1>
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

      </div>
    </div>
  );
};

export default ResetPassword;
