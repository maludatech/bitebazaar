"use client";

import { useCartContext } from "@/context/CartContext";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import Image from "next/image";
import Link from "next/link";

const CartModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { cart, removeFromCart, updateQuantity } = useCartContext();

    // Return null if modal is not open
    if (!isOpen) return null;

    // Calculate the subtotal by summing the price * quantity for each product
    const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // Assuming no extra taxes or fees, total will be the same as subtotal
    const total = subtotal;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white font-rubik bg-opacity-80 z-50 px-2 sm:px-8 lg:px-12">
            <div className="glassmorphism_cart body-container w-full sm:max-w-[36rem] flex flex-col gap-2 overflow-y-auto max-h-screen"> {/* Added max-h-screen */}
                
                {/* Header with cart item count and close button */}
                <div className="bg-primary_color flex justify-between items-center text-lg uppercase p-3 rounded-t-lg">
                    <h2>Shopping Cart ({cart.length})</h2>
                    <IonIcon icon={closeOutline} className="size-8 font-bold hover:cursor-pointer" onClick={onClose} />
                </div>

                {/* Cart content */}
                {cart.length === 0 ? (
                    <div className="flex flex-col py-6 gap-8 justify-center items-center">
                        <p className="text-lg">There are no products in the cart😣!</p>
                        <Link href={"/menu"} onClick={onClose} className="uppercase underline hover:underline-offset-2">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart items */}
                        <div className="overflow-y-auto max-h-[25vh]"> {/* Added scrolling for cart items */}
                            {cart.map((product) => (
                                <div key={product.id} className="flex justify-between gap-3 px-4 pt-2 items-center group">
                                    <div className="bg-white text-black w-full flex items-center justify-between rounded-lg p-2">
                                        
                                        {/* Product Image */}
                                        <div className="flex h-full w-full relative">
                                            <Image
                                                src={product.imageUrl}
                                                width={120}
                                                height={120}
                                                alt={product.name}
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <h3 className="font-bold text-[15px]">{product.name}</h3>
                                            <p className="text-[12px] font-[400]">NGN {product.price}.00</p>
                                        </div>

                                        {/* Quantity control */}
                                        <div className="bg-[#eeeeee] flex justify-between items-center p-2 text-[12px] gap-4 font-[400] text-[#444] rounded-sm">
                                            <h1 className="cursor-pointer" onClick={() => {
                                                if (product.quantity > 1) {
                                                    updateQuantity(product.id, product.quantity - 1);
                                                }
                                            }}>-</h1>
                                            <h2>{product.quantity}</h2>
                                            <h1 className="cursor-pointer" onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</h1>
                                        </div>
                                    </div>

                                    {/* Remove item button */}
                                    <IonIcon icon={closeOutline} className="text-red-500 size-6 hover:cursor-pointer hidden group-hover:flex" onClick={() => removeFromCart(product.id)} />
                                </div>
                            ))}
                        </div>

                        {/* Subtotal and Total */}
                        <div className="flex flex-col px-4 pt-2">
                            <div className="flex justify-between items-center">
                                <h1>Subtotal</h1>
                                <h2>NGN {subtotal}.00</h2> {/* Subtotal Display */}
                            </div>
                            <div className="flex justify-between">
                                <h1>Total</h1>
                                <h2>NGN {total}.00</h2> {/* Total Display */}
                            </div>

                            {/* Cart and Checkout buttons */}
                            <div className="flex gap-2 justify-between py-4">
                                <Link href={"/menu"} onClick={onClose} className="uppercase bg-white text-primary_color p-3 w-full text-center font-semibold rounded-md hover:opacity-90 text-sm">Continue shopping</Link>
                                <Link href={"/checkout"} onClick={onClose} className="uppercase bg-white text-primary_color p-3 w-full text-center font-semibold rounded-md hover:opacity-90 text-sm">Checkout</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
