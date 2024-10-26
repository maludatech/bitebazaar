"use client"

import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";

interface Form{
    firstName: string,
    lastName: string,
    subject: string,
    message: string
}

const Contact = () => {
    const {user} = useAuthContext();
    const router = useRouter();
    const userId = user?.userId;

    useEffect(() => {
        const isLoggedIn = Cookies.get('isLoggedIn');
        if (!user && !isLoggedIn) {
        router.push('/login');
        }
    }, [user, router]);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] =  useState<Form>({
        firstName: "",
        lastName: "",
        subject: "",
        message: ""
    })

    const handleSubmit = async(event:any) => {
        event.preventDefault();

        if (!userId) {
            setErrorMessage("User not authenticated.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/user/support/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }else{
                setForm({ firstName: "", lastName: "", subject: "", message: "" });
            }

            setSuccessMessage("Message sent successfully!!");
            setTimeout(() => setSuccessMessage(""), 5000);
            router.push("/menu");
        } catch (error) {
            console.error("Failed to send message", error);
            setErrorMessage("Failed to send message");
            setTimeout(() => setErrorMessage(""), 5000);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="w-full h-full font-rubik">
        <div className="body-container flex flex-col gap-4 pt-20 pb-10">
            <h1 className="py-8 text-center font-bold text-4xl lg:text-5xl">CONTACT</h1>
            <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
                <label className="font-bold text-lg flex items-center">Name<span className="text-red-500">*</span></label>
                <div className="flex flex-row gap-4">
                    <input className="border-[1px] w-full border-black rounded-sm p-2" placeholder="First name" required onChange={(e) => setForm({ ...form, firstName: e.target.value })}/>
                    <input className="border-[1px] w-full border-black rounded-sm p-2" placeholder="Last name" required onChange={(e) => setForm({ ...form, lastName: e.target.value })}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg">Subject</label>
                    <input className="border-[1px] w-full border-black rounded-sm p-2" placeholder="" required onChange={(e) => setForm({ ...form, subject: e.target.value })}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg">Your Message</label>
                    <textarea className="border-[1px] w-full border-black rounded-sm p-2" rows={10} placeholder="" required onChange={(e) => setForm({ ...form, message: e.target.value })}/>
                </div>
                
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
                <button className="rounded-md text-white bg-blue-500 p-3 w-fit ml-1 hover:bg-blue-600 duration-300 transition ease-in-out" type="submit" disabled={isLoading}>{isLoading ? "Sending..." : "Send Message"}</button>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact;
