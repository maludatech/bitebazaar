import Image from "next/image";
import Link from "next/link";

const Restaurant = () => {
  return (
    <div className="flex flex-col font-rubik">
      <div className="flex flex-col sm:flex-row text-black">
        <div className="h-full w-full sm:w-1/2 ">
          <div
            className="w-full h-[700px]"
            style={{
              backgroundImage: "url('/assets/images/chicken-bg.jpg')", // Remove 'assets'
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}            
          ></div>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 p-10 text-center">
          <div className="px-10 flex items-center flex-row">
            <div className="border-t-4 border-black w-full"></div>
            <div className="border-t-[1px] border-black w-full"></div>
            <div className="border-t-4 border-black w-full"></div>
          </div>
          <h1 className="text-4xl pt-4 font-bold">Present</h1>
          <div className="flex items-center gap-4 pt-6 flex-col font-bold text-6xl font-rubik">
                <h1>Beef</h1>
                <h1>Burger</h1>
                <h1 className="font-pacifico text-green-700">Sauce</h1>
          </div>
          <h2 className="text-lg font-bold pt-10">OUR SIGNATURE HANDMADE BEEF BURGER</h2>
          <p className="text-lg pt-10">
            This is truly the best beef burger available! The beef patties are healthy, loaded with fresh herbs, and full of flavor with the perfect blend of seasonings.
          </p>
          <Link href={"/menu"} className="mt-10 bg-primary_color py-3 px-6 rounded-md w-fit self-center text-white hover:opacity-90 transition duration-300 ease-in-out">View Menu</Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col w-full sm:w-1/2 p-10 text-center text-white bg-[#1C2123]">
          <div className="px-10 flex items-center flex-row">
            <div className="border-t-4 border-white w-full"></div>
            <div className="border-t-[1px] border-white w-full"></div>
            <div className="border-t-4 border-white w-full"></div>
          </div>
          <h1 className="text-4xl pt-4 font-bold">SMOKED</h1>
          <div className="flex items-center gap-4 pt-6 flex-col font-bold text-6xl font-rubik">
                <h1 className="font-pacifico text-green-700">GUINEA</h1>
                <h1>FOWL</h1>
          </div>
          <h2 className="text-lg font-bold pt-10 uppercase">roasted to perfection Its delicate flesh is surprisingly tender</h2>
          <p className="text-lg pt-10">
                Its delicate flesh is surprisingly tender, with a hint of gaminess that adds depth and complexity to each bite. And when roasted to perfection, the skin develops a crispy, irresistible crunch that makes it a culinary delight. This extravagant smoked guinea fowl recipe is a dinner party dish to show off with.
          </p>
          <Link href={"/menu"} className="mt-10 bg-primary_color py-3 px-6 rounded-md w-fit self-center text-white hover:opacity-90 transition duration-300 ease-in-out">View Menu</Link>
        </div>
        <div className="h-full w-full sm:w-1/2">
        <div
            className="w-full h-[700px]"
            style={{
              backgroundImage: "url('/assets/images/Guinea-fowl-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}            
          ></div>
        </div>
      </div>
      <div className="flex flex-col  bg-primary_color  text-white py-10">
        <div className="flex flex-row gap-2 items-center justify-center">
            <div className="border-b-2 uppercase border-white border-spacing-6 font-bold">
              The
            </div>
            <p className="text-3xl font-bold uppercase">super sunday</p>
        </div>
        <Image
          src={"/assets/images/shawarma-bg.png"}
          width={1000}
          height={1000}
          alt="shawarma png"
          className="self-center"
        />
        <div className="flex justify-between items-center px-10">
          <Image
            src={"/assets/images/tomatoes.png"}
            width={100}
            height={100}
            alt="tomatoes png"
          />
          <Image
            src={"/assets/images/onions.png"}
            width={100}
            height={100}
            alt="tomatoes png"
          />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
