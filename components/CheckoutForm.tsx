"use client"

import React, { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";

const CheckoutForm = ({total}: {total: number}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsLoading(true);
    }

  return (
    <form onSubmit={handleSubmit}>
        {clientSecret ? (
            <PaymentElement />
        ) : (
            <div className="flex items-center justify-center w-full">
                <FontAwesomeIcon icon={faSpinner} className="text-4xl text-primary_color animate-spin" />
            </div>
        )}
        <button className="w-full bg-primary_color text-secondary_color p-4 rounded-md mt-6 text-lg hover:opacity-90">
            {isLoading ? <Spinner otherStyles="" /> : "Pay"}
        </button>
    </form>
  )
}

export default CheckoutForm;