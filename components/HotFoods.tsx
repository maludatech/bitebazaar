"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HotFood {
    imageUrl: string;
    foodName: string;
    price: string;
}

const HotFoods = () => {

    const router = useRouter();

    const hotFoods: HotFood[] = [
        {
            imageUrl: "/assets/images/hot-food/mixed-shawarma.jpg",
            foodName: "Mixed Shawarma",
            price: "5,300.00",
        },
        {
            imageUrl: "/assets/images/hot-food/beef-burger.jpg",
            foodName: "Beef Burger",
            price: "7,000.00",
        },
        {
            imageUrl: "/assets/images/hot-food/chicken-shawarma.jpg",
            foodName: "Chicken Shawarma",
            price: "5,000.00",
        },
        {
            imageUrl: "/assets/images/hot-food/beef-shawarma.jpg",
            foodName: "Beef Shawarma",
            price: "5,000.00",
        },
        {
            imageUrl: "/assets/images/hot-food/Moist-Chicken-Burgers.jpg",
            foodName: "Singe Smoked Chicken Burger",
            price: "7,000.00",
        },
        {
            imageUrl: "/assets/images/hot-food/grilled-chicken.jpg",
            foodName: "Smoked Whole Chicken",
            price: "12,000.00",
        },
    ];

    return (
        <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg 
                    data-name="Layer 1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className='relative block fill-primary_color'>
                    <path 
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"  
                        className="shape-fill">
                    </path>
                </svg>
            </div>

            <div className="body-container flex flex-col pt-16 sm:pt-32 px-4 py-8 font-rubik">
                <h1 className="text-center font-bold text-4xl">Hot Food of the Week</h1>
                
                {/* Iterate over the hotFoods array */}
                <div className="flex flex-wrap justify-center items-center gap-8 pt-8 ">
                    {hotFoods.map((food, index) => (
                        <div key={index} className="max-w-[300px] text-center">
                            <Image
                                src={food.imageUrl}
                                alt={food.foodName}
                                height={300}
                                width={300}
                                className="rounded-lg"
                            />
                            <h2 className="text-xl font-semibold mt-4">{food.foodName}</h2>
                            <p className="text-lg font-bold text-primary_color">{food.price} NGN</p>
                            <button className="bg-primary_color text-white uppercase font-semibold p-2 rounded-lg mt-4 hover:bg-opacity-85 transition duration-300 ease-in-out" onClick={()=>router.push("/menu")}>Order Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HotFoods;
