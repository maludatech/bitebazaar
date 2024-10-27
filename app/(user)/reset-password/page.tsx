"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@/components/Spinner';
import { useAuthContext } from '@/context/AuthContext';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (user && isLoggedIn) {
      router.push('/menu');
    }
  }, [user, router]);

  // Toggle password visibility
  const togglePasswordVisibility = (type: number) => {
    type === 1 ? setShowPassword((prev) => !prev) : setShowPassword2((prev) => !prev);
  };

  // Handle form submission with validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword.length < 8 || newPassword.length > 15) {
      setErrorMessage("Password must be between 8 and 15 characters.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successfully");
        setTimeout(() => {
          setSuccessMessage("");
          router.replace("/login");
        }, 3000);
      } else {
        const result = await response.json();
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage("Internal Server Error");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen text-[#444444]">
      <div className="glassmorphism_login body-container w-full lg:max-w-[36rem] flex flex-col gap-4 font-rubik">
        <h2 className="text-3xl font-bold text-primary_color">Reset Password</h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
            <label className="first-letter:uppercase font-semibold w-full sm:w-1/3">
              New Password:
            </label>
            <div className="flex items-center gap-1 w-full">
              <input
                className="p-3 border-[1px] relative rounded-lg bg-slate-100 border-gray-500 w-full text-black"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => togglePasswordVisibility(1)}
                className="hover:cursor-pointer absolute right-7 text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
            <label className="first-letter:uppercase font-semibold w-full sm:w-1/3">
              Confirm Password:
            </label>
            <div className="flex items-center gap-1 w-full">
              <input
                className="p-3 border-[1px] relative rounded-lg bg-slate-100 border-gray-500 w-full text-black"
                type={showPassword2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword2 ? faEyeSlash : faEye}
                onClick={() => togglePasswordVisibility(2)}
                className="hover:cursor-pointer absolute right-7 text-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-center pt-4">
            <button
              className="w-fit min-w-36 p-3 flex items-center justify-center font-bold text-secondary_color rounded-md bg-primary_color relative hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? <Spinner otherStyles={""} /> : "Reset Password"}
            </button>
          </div>
        </form>

        {errorMessage && (
          <p className="w-full p-2 mt-2 text-sm text-red-500 text-center bg-red-300 border-red-500 border-[1px] rounded-md">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="w-full p-2 text-sm mt-2 text-center text-blue-500 bg-blue-300 border-blue-500 border-[1px] rounded-md">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
