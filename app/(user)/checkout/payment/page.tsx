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

const CheckOut = () => {
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

  return (
    <div className="pt-20 font-roboto">
      <div className="body-container py-6 px-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-lg">Total: NGN{total}.00</h1>
        </div>
        <Elements stripe={stripePromise} options={{
          mode: "payment",
          amount: total,
          currency: "ngn"
        }}>
          <CheckoutForm total={total}/>
        </Elements>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
