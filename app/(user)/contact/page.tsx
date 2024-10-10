"use client"

import Footer from "@/app/components/Footer";
import { useState } from "react";

interface Form{
    firstName: string,
    lastName: string,
    subject: string,
    message: string
}

const Contact = () => {
    const [form, setForm] =  useState<Form>({
        firstName: "",
        lastName: "",
        subject: "",
        message: ""
    })

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(form);
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
                <button className="rounded-md text-white bg-blue-500 p-3 w-fit ml-1 hover:bg-blue-600 duration-300 transition ease-in-out" type="submit">Send Message</button>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact;
