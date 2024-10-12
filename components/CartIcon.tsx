"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CartIcon = () => {
    const [productNumber, setProductNumber] = useState<string>("0");
    
  return (
    <div className="bg-secondary_color items-center justify-center flex relative p-4 rounded-md duration-300 transition ease-in-out font-rubik">
        <div className="absolute -top-3 -right-3 rounded-full bg-[#dd2222] w-[30px] h-[30px] text-center flex justify-center items-center text-xs text-white">
            <h1>{productNumber}</h1>
        </div>
        <FontAwesomeIcon icon={faCartShopping} className="text-primary_color size-6"/>
    </div>
  )
}

export default CartIcon;