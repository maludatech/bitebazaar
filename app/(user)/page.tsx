"use client";

import Image from "next/image";
import { IonIcon } from "@ionic/react";
import { locationOutline, navigateOutline } from "ionicons/icons";
import HotFoods from "@/components/HotFoods";
import Products from "@/components/Products";
import Resturant from "@/components/Resturant";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <section className="flex flex-col">
      {/* Main section with background */}
      <div className="font-[family-name:var(--font-geist-sans)] bg-primary_color h-full">
        <div className="body-container flex flex-col lg:flex-row justify-center items-center pt-24 pb-10 px-4">
          
          {/* Image section */}
          <div className="flex max-w-[458px]">
            <Image
              src="/assets/images/bitebazaar-home.avif"
              height={500}
              width={500}
              alt="Famous Bitebazaar burger"
            />
          </div>

          {/* Text section */}
          <div className="flex flex-col gap-4 text-white">
            <h1 className="text-5xl font-bold">Food delivery and</h1>
            <h1 className="text-5xl font-bold">More</h1>

            {/* Location input section */}
            <div className="flex flex-col gap-4 pt-4">
              <p className="text-lg font-semibold">
                Your number 1 Naija Shawarma & Burger plug!
              </p>

            </div>
          </div>
          
        </div>
      </div>
      <HotFoods/>
      <Products/>
      <Resturant/>
      <Services/>
      <Footer/>
    </section>
  );
}
