"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { useAuthContext } from "@/context/AuthContext";

const Menu = () => {
    const {user} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = Cookies.get('isLoggedIn');
        if (!user && !isLoggedIn) {
        router.push('/login');
        }
    }, [user, router]);

  return (
    <div className="pt-20 font-lato">
        <div className="body-container flex flex-col gap-4">
            <h1 className="py-8 text-center font-bold text-4xl lg:text-5xl">SHOP</h1>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3">
                {ProductList.map((product, index)=>(
                    <div key={index} className="flex flex-col gap-2 items-center justify-center pb-6 text-[#444444]">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={300}
                            height={300}
                        />
                        <h1 className="text-xl font-bold">{product.name}</h1>
                        <h4>NGN {product.price}</h4>
                    <button className="p-3 bg-primary_color text-white rounded-md mt-2" onClick={()=>router.push(user? "/cart" : "/login")}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Menu