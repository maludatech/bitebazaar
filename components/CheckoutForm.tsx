"use client"

import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({total}: {total: number}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        fetch("/api/user/create-payment-intent",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                total
            })
        })
        .then((res)=>res.json())
        .then((data) => setClientSecret(data.clientSecret));
    },[])

  return (
    <form>
        {clientSecret && <PaymentElement/>}
        <button className="w-full bg-primary_color text-secondary_color p-4 rounded-md mt-6 uppercase">Pay</button>
    </form>
  )
}

export default CheckoutForm;