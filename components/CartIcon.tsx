"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartModal from "./modal/CartModal";
import { useCartContext } from "@/context/CartContext"; // Import CartContext

const CartIcon = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cart } = useCartContext(); // Access cart items
    const productNumber = cart.length;

    return (
        <div>
            <div
                className="bg-secondary_color items-center justify-center flex relative p-4 rounded-md duration-300 transition ease-in-out font-rubik hover:cursor-pointer hover:scale-105"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="absolute -top-3 -right-3 rounded-full bg-[#dd2222] w-[30px] h-[30px] text-center flex justify-center items-center text-xs text-white">
                    <h1>{productNumber}</h1>
                </div>
                <FontAwesomeIcon icon={faCartShopping} className="text-primary_color size-6" />
            </div>

            {/* Cart Modal */}
            <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CartIcon;
