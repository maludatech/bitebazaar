"use client"

import React, { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";
import Loader from "./Loader";

const CheckoutForm = ({totalInKobo}: {totalInKobo: number}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const totalInNaira = totalInKobo/100;

    useEffect(()=>{
        fetch("/api/user/create-payment-intent",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                totalInKobo
            })
        })
        .then((res)=>res.json())
        .then((data) => setClientSecret(data.clientSecret));
    },[])

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsLoading(true);

        if(!stripe || !elements){
            return;
        }

        const {error: submitError} = await elements.submit();
        if(submitError){
            setIsLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url: `http://localhost:3000/checkout/payment/payment-success?amount=${totalInNaira}`
            }
        })

        if(error){
            setErrorMessage(error.message);
        }else{

        }

        setIsLoading(false);
    }

  return (
    <form onSubmit={handleSubmit}>
        {clientSecret ? (
            <PaymentElement />
        ) : (
            <Loader otherStyles="text-primary_color"/>
        )}

        <div className="flex flex-col gap-4 pt-6">
            {errorMessage && <p className="w-full p-2 mt-2 text-sm text-red-500 text-center bg-red-300 border-red-500 border-[1px] rounded-2xl">{errorMessage}</p>}
            <button className="w-full bg-primary_color text-secondary_color p-4 rounded-md text-lg hover:opacity-90">
                {isLoading ? <Spinner otherStyles="" /> : `Pay NGN${totalInKobo/100}.00`}
            </button>
        </div>
    </form>
  )
}

export default CheckoutForm;