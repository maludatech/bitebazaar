import Image from "next/image";
import Link from "next/link";

const Services = () => {
    return (
        <div className="bg-[#1C2123] flex flex-col w-full py-5 lg:p-10">
            <div className="body-container flex flex-col lg:flex-row py-8 font-rubik lg:border-b-4 lg:border-spacing-16 border-primary_color">
                <div className="h-[550px] w-full relative">
                    <Image
                        src="/assets/images/delicious-burger-bg.jpg"
                        layout="fill"
                        objectFit="cover" 
                        alt="burger-bg"
                        className="object-cover"
                    />
                </div>
                <div className="bg-white w-full flex flex-col justify-between h-[550px] px-8 py-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold border-b-[1px] border-black w-fit">OUR</h1>
                        <h1 className="text-5xl font-bold">MENUS</h1>
                    </div>
                    <p className="text-xl">
                        At Shawarma Nearby, we believe that great-tasting food brings people together, and that’s why we’ve crafted a menu that offers something for everyone.
                    </p>
                    <Link href={"/shop"} className="mt-10 bg-primary_color text-xl font-semibold py-3 px-6 rounded-md w-fit uppercase text-white hover:opacity-90 transition duration-300 ease-in-out">View Menu</Link>
                </div>
                <div className="bg-slate-400 w-full flex flex-col justify-between h-[550px] px-8 py-12">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold border-b-[1px] border-black w-fit">ORDER</h1>
                        <h1 className="text-4xl font-bold">DELIVERY</h1>
                    </div>
                    <p className="text-lg">
                        Our friendly staff are trained and passionately dedicated to providing top notch service, making sure your orders taste just right and delivered timeously.
                    </p>
                    <Link href={"/shop"} className="mt-10 bg-black text-xl font-semibold py-3 px-6 rounded-md w-fit uppercase text-white hover:opacity-90 transition duration-300 ease-in-out">Order Online</Link>
                </div>
            </div>
        </div>
    )
}

export default Services;
