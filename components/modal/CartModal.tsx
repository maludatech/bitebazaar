"use client"

import { useCartContext } from "@/context/CartContext";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

const CartModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { cart, removeFromCart, updateQuantity } = useCartContext();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white font-rubik bg-opacity-70 z-50 px-4">
            <div className="glassmorphism_cart body-container w-full sm:w-1/3 xl:w-1/4 flex flex-col gap-2">
                <div className="p-2 bg-primary_color flex justify-between items-center text-lg uppercase">
                    <h2>Shopping Cart ({cart.length})</h2>
                    <IonIcon icon={closeOutline} className="size-6"/>
                </div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((product) => (
                        <div key={product.id} className="flex justify-between items-center mb-4">
                            <div>
                                <h3>{product.name}</h3>
                                <p>Price: {product.price}</p>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    min="1"
                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                    className="border rounded px-2 py-1"
                                />
                            </div>
                            <button
                                className="text-red-500"
                                onClick={() => removeFromCart(product.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
                <button className="mt-4 bg-primary_color text-white p-2 rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CartModal;
