"use client";

import { useEffect, useState } from "react";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Payment = () => {
  const { user } = useAuthContext();
  const { cart, deliveryFee } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (!user && !isLoggedIn) {
      router.push('/login');
    }
  }, [user, router]);

    //Load stripe
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

    // Calculate the subtotal by summing the price * quantity for each product
    const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // Calculate the total with delivery fee if selected
    const total = subtotal + deliveryFee;

    // Convert to Kobo and ensure it's at least 50 Kobo (Stripe's minimum)
    const totalInKobo = Math.max(total * 100, 50);

    const currentDate = new Intl.DateTimeFormat('en-GB').format(new Date());

  return (
    <div className="pt-20 font-roboto">
      <div className="body-container py-6 px-8 flex flex-col gap-6 z-20">
        <h1 className="py-4 text-center font-bold text-5xl lg:text-6xl">PAYMENT</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8 sm:justify-center text-[16px] w-full text-[#444444] pb-4">
          <h1>Total: <span className="font-semibold">NGN{total}.00</span></h1>
          <h1>Date: <span className="font-semibold">{currentDate}</span></h1>
          <h1>Payment Method: <span className="font-semibold">Stripe Payment Gateway</span></h1>
        </div>
        <Elements stripe={stripePromise} options={{
          mode: "payment",
          amount: totalInKobo,
          currency: "ngn"
        }}>
          <CheckoutForm totalInKobo={totalInKobo}/>
        </Elements>
      </div>
      <Footer />
    </div>
  );
};

export default Payment ;
