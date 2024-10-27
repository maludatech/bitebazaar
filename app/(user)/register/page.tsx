"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { IonIcon } from '@ionic/react';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Spinner } from '@/components/Spinner';
import { useAuthContext } from '@/context/AuthContext';

interface User {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  billingAddress: string;
  phoneNumber: string;
}

const Register = () => {
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    billingAddress: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    billingAddress: false,
    phoneNumber: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (user && isLoggedIn) {
      router.push('/menu');
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Reset the error when user starts typing
  };

  const validateForm = () => {
    const { email, password, confirmPassword, fullName, billingAddress, phoneNumber } = form;
    let hasError = false;
    const newErrors = {
      email: false,
      password: false,
      confirmPassword: false,
      fullName: false,
      billingAddress: false,
      phoneNumber: false,
    };
  
    if (!email) {
      newErrors.email = true;
      hasError = true;
    }
    if (!fullName) {
      newErrors.fullName = true;
      hasError = true;
    }
    if (!billingAddress) {
      newErrors.billingAddress = true;
      hasError = true;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = true;
      hasError = true;
    }
  
    if (!password) {
      newErrors.password = true;
      hasError = true;
      setErrorMessage("Password cannot be empty");
    } else if (password.length < 8) {
      newErrors.password = true;
      hasError = true;
      setErrorMessage("Password must be at least 8 characters long");
    }
  
    if (password !== confirmPassword) {
      newErrors.confirmPassword = true;
      hasError = true;
      setErrorMessage("Passwords do not match");
    }
  
    setErrors(newErrors);
  
    // If any errors exist, prevent form submission
    if (hasError) {
      return false;
    }
  
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up.');
      }

      const data = await response.json();
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="bg-white py-24 p-4 flex justify-center items-center min-h-screen">
      <div className="glassmorphism_login body-container w-full lg:max-w-[36rem] flex flex-col gap-4 font-rubik">
        <h2 className="text-3xl font-bold mb-2 text-primary_color">Sign Up</h2>

        <form onSubmit={handleSignUp}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            className={`w-full p-3 mb-2 border rounded-2xl ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleInputChange}
            className={`w-full p-3 mb-2 border rounded-2xl ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <input
            type="text"
            name="billingAddress"
            placeholder="Billing Address"
            value={form.billingAddress}
            onChange={handleInputChange}
            className={`w-full p-3 mb-2 border rounded-2xl ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleInputChange}
            className={`w-full p-3 mb-2 border rounded-2xl ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className="relative flex items-center w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete='new-password'
                value={form.password}
                onChange={handleInputChange}
                className={`w-full p-3 mb-4 border rounded-2xl ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className="size-5 right-4 top-4 absolute text-slate-400 hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="relative flex items-center w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleInputChange}
                className={`w-full p-3 mb-4 border rounded-2xl ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <IonIcon
                icon={showConfirmPassword ? eyeOffOutline : eyeOutline}
                className="size-5 right-4 top-4 absolute text-slate-400 hover:cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center font-bold text-secondary_color p-3 rounded-full bg-primary_color relative hover:opacity-90"
          >
            {isLoading ? (
              <Spinner otherStyles="" />
            ) : (
                <h1 className="mx-auto">Sign Up with Email</h1>
            )}
          </button>
        </form>

        {errorMessage && (
          <p className="w-full p-2 mt-2 text-sm text-red-500 text-center bg-red-300 border-red-500 border-[1px] rounded-2xl">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="w-full p-2 mt-2 text-sm text-blue-500 text-center bg-blue-300 border-blue-500 border-[1px] rounded-2xl">
            {successMessage}
          </p>
        )}

        <div className="text-center justify-center mt-2 text-[13px] flex flex-col gap-1 text-slate-500">
          <p>By creating an account, you automatically accept our</p>
          <p>
            <Link href="/terms-of-service" className="underline hover:underline-offset-2">Terms of Service</Link>,
            <Link href="/privacy-policy" className="underline hover:underline-offset-2">Privacy Policy</Link>, and
            <Link href="/cookie-policy" className="underline hover:underline-offset-2"> Cookie Policy</Link>.
          </p>
        </div>

        <div className="text-center justify-center mt-3 text-sm flex flex-col text-slate-500">
          <p>Already have an account: <Link href={"/login"} className='underline hover:underline-offset-4'>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
