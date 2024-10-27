"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Spinner } from '@/components/Spinner';
import { useAuthContext } from '@/context/AuthContext';

const RestorePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (user && isLoggedIn) {
      router.push('/menu');
    }
  }, [user, router]);

  // Enable button only if all input fields are filled
  useEffect(() => {
    setIsButtonEnabled(code.every((digit) => digit !== ""));
  }, [code]);

  // Handle input changes, including backspace navigation
  const handleInputChange = (e:any, index: any) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      // Move focus to the next input
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (!value && index > 0) {
      // Move focus to the previous input on backspace
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle pasting a 6-digit code
  const handlePaste = (e: any) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    setCode(paste);

    // Set focus to the first empty input or the last one
    const firstEmptyIndex = paste.findIndex((char:any) => char === "");
    const nextInput = document.getElementById(`code-input-${firstEmptyIndex >= 0 ? firstEmptyIndex : 5}`);
    if (nextInput) {
      nextInput.focus();
    }
  };

  // Handle submission of the 6-digit code
  const handleContinue = async () => {
    setIsLoading(true);
    if (!isButtonEnabled) return;

    const restoreCode = code.join("");
    try {
      const response = await fetch("/api/user/restore-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: restoreCode }),
      });

      if (response.ok) {
        const { userId } = await response.json();
        router.replace(`/reset-password?userId=${userId}`);
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("Internal server error");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen">
      <div className="glassmorphism_login body-container w-full lg:max-w-[36rem] flex flex-col gap-4 font-rubik">
        <h2 className="text-3xl font-bold text-primary_color">Restore Password</h2>
        <h1 className="text-sm font-bold text-[#444444]">
          Enter the six-digit code sent to your email
        </h1>

        {/* Code Input */}
        <div className="flex justify-center mt-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onPaste={handlePaste}
              className="w-10 h-10 mx-1 text-center border rounded text-black"
              style={{ fontSize: "1.5rem", borderColor: "#d0d0d0" }}
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className={`w-full flex items-center justify-center font-bold text-secondary_color p-3 rounded-full bg-primary_color relative hover:opacity-90 ${
            isButtonEnabled ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
          }`}
          disabled={!isButtonEnabled}
        >
          {isLoading ? <Spinner otherStyles="" /> : "Continue"}
        </button>

        {errorMessage && (
          <p className="w-full p-2 mt-2 text-sm text-red-500 text-center bg-red-300 border-red-500 border-[1px] rounded-2xl">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default RestorePassword;
