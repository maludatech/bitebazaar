import Footer from "@/components/Footer"
import Image from "next/image"


const About = () => {
  return (
    <div className="w-full h-full font-rubik">
        <div className="flex flex-col pt-20">
            <div className="bg-[#9c9999] h-full w-full p-8 py-20">
                    <div className="border-y-2 border-slashes">
                        <div className="body-container text-center p-20">
                            <h1 className="text-4xl font-bold text-white">ABOUT US</h1>
                        </div>
                    </div>
            </div>
            <div className="bg-[#1C2123] h-full w-full">
                <div className="body-container p-8 py-16">
                    <div className="border-y-2 border-spacing-10 border-primary_color">
                        <div className="flex flex-col gap-6 font-rubik font-[550] text-[#7A7A7A] py-4">
                            <h1 className="text-secondary_color text-center text-2xl font-bold">ABOUT BITEBAZAAR</h1>
                            <p>Welcome to BiteBazaar, where authentic Middle Eastern vibes meet smoky Naija flavor!</p>
                            <p>As Naija’s soon-to-be fastest growing cloud kitchen, we are dedicated to serving you the most delicious and mouthwatering shawarma you’ll ever taste.</p>
                            <p>Our story is one with a passion for food and love for nature in plants and seeds that build up in culinary traditions across the Middle East and Africa.</p>
                            <p>At BiteBazaar, we believe that great-tasting food brings people together, and that’s why we’ve crafted a menu that offers something for everyone. From our signature shawarmas and burgers to our flavorful smoked birds marinated to perfection and garnished with fresh vegetables, where every bite is a celebration of flavor.</p>
                            <p>We source only the finest ingredients, ensuring that every wrap, platter and box is made with care and attention to detail and under the strictest standards of food safety and hygiene.</p>
                            <p>Our homemade sauces and freshly baked pita bread are the perfect complements to our savory meats and crisp vegetables, providing a balanced and satisfying meal every time.</p>
                            <p>BiteBazaar is more than just great tasting food, it’s family, its culture and it is a celebration of Africa.</p>
                            <p>Our friendly staff are trained and passionately dedicated to providing top notch service, making sure your orders taste just right and delivered timeously.</p>
                            <p>BiteBazaar is your go-to for quick, reliable service when you are hungry or simply craving an unforgettable experience.</p>
                            <p>Welcome to BiteBazaar</p>
                            <div className="py-6 flex flex-col sm:flex-row gap-6 justify-center self-center sm:items-center">
                                <div className="flex flex-col gap-2 items-center uppercase text-white">
                                    <h1 className="text-secondary_color font-pacifico text-6xl sm:text-7xl">Original</h1>
                                    <h1 className="font-rubik text-7xl sm:text-8xl">Chicken</h1>
                                    <h1 className="font-pacifico text-6xl sm:text-7xl">Burger</h1>
                                </div>
                                <div className="w-full h-full relative">
                                <Image
                                        src={"/assets/images/brush-bg.png"}
                                        width={600}
                                        height={600}
                                        alt="chicken-burger"
                                        className=""
                                    />
                                    <Image
                                        src={"/assets/images/fish-burger.png"}
                                        width={600}
                                        height={600}
                                        alt="chicken-burger"
                                        className="absolute top-0 left-0 z-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default About