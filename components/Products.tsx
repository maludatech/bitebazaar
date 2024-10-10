import Image from "next/image";

interface HotFood {
    imageUrl: string;
    foodName: string;
    heading: string,
    description: string
}

const Products = () => {

    const hotFoods: HotFood[] = [
        {
            imageUrl: "/assets/images/products/shawarma.png",
            foodName: "Mixed Shawarma",
            heading: "Our Shawarmas",
            description: "This mixed shawarma wraps are hands down the best you’ll ever taste"
        },
        {
            imageUrl: "/assets/images/products/beef-burger.png",
            foodName: "Beef Burger",
            heading: "Our Burgers",
            description: "Burger for the body is not enough there must be a burger for the soul"
        },
        {
            imageUrl: "/assets/images/products/grilled-chicken.png",
            foodName: "Smoked Chicken",
            heading: "Our Smoked birds",
            description: "Its delicate flesh is surprisingly tender, with a hint of gaminess."
        }
    ];

    return (
        <div className="relative w-full mt-4 pb-8 flex flex-col bg-primary_color">
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg 
                    data-name="Layer 1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className='relative block fill-white'>
                    <path 
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"  
                        className="shape-fill">
                    </path>
                </svg>
            </div>
            <div className="body-container flex flex-col pt-16 sm:pt-32 px-4 pb-4 font-rubik">
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                {hotFoods.map((food, index) => (
                    <div key={index} className="flex flex-col gap-1 max-w-[500px] items-center justify-center mb-16">
                        <div className="border-y-2 border-gray-400">
                            <h1 className="text-4xl text-secondary_color py-4">{food.heading}</h1>
                        </div>
                        <Image
                            src={food.imageUrl} 
                            height={500}
                            width={500}
                            alt="products_img"
                            className="pt-4"
                        />
                        <button className="p-4 bg-secondary_color text-primary_color rounded-lg font-bold uppercase hover:bg-opacity-85 transition duration-300 ease-in-out">Order Now</button>
                        <h1 className="text-3xl font-bold text-white pt-4">{food.foodName}</h1>
                        <p className="text-center pt-2 text-gray-300 uppercase font-semibold">{food.description}</p>
                    </div>
                ))}
            </div>
                </div>
        </div>
    )
}

export default Products;
