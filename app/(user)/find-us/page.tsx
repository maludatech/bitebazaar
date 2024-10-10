import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Link from "next/link";

const FindUS = () => {
  return (
    <div className="pt-20 font-roboto">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row">
          
          {/* Left Section: Content */}
          <div className="flex flex-col w-full sm:w-1/2 p-10 text-center items-center justify-center text-white bg-[#1C2123] gap-16">
            
            {/* Title and Main Content */}
            <h1 className="text-6xl pt-4 font-bold">LEKKI</h1>
            <h2 className="text-lg font-bold uppercase border-y-4 py-10 border-secondary_color">
                Block 114 Plot 4, Akiogun street, Oniru, Victoria island, Lagos state
            </h2>

            <div className="flex flex-col gap-5">
                <h1 className="uppercase text-xl font-bold">Open Everyday</h1>
                <h1 className="uppercase text-xl font-bold text-secondary_color">10.00Am – 10.00Pm</h1>
            </div>
            
            {/* Link Button */}
            <Link 
              href={"/find-us"} 
              className="bg-secondary_color py-3 px-6 rounded-md w-fit self-center text-primary_color font-bold text-lg hover:opacity-90 transition duration-300 ease-in-out"
            >
              GET DIRECTIONS
            </Link>
          </div>

          {/* Right Section: Background Image */}
          <div className="h-full w-full sm:w-1/2">
            <div
              className="w-full h-[700px]"
              style={{
                backgroundImage: "url('/assets/images/duck-legs-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row">
          
          {/* Left Section: Content */}
          <div className="h-full w-full sm:w-1/2">
            <div
              className="w-full h-[700px]"
              style={{
                backgroundImage: "url('/assets/images/mixed-shawarma.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>

          {/* Right Section: Background Image */}

          <div className="flex flex-col w-full sm:w-1/2 p-10 text-center items-center justify-center text-black bg-secondary_color gap-16">
            
            {/* Title and Main Content */}
            <h1 className="text-6xl pt-4 font-bold uppercase">Mainland</h1>
            <h2 className="text-lg font-bold uppercase border-y-4 py-10 border-black w-full">
                Coming Soon
            </h2>

            <div className="flex flex-col gap-5">
                <h1 className="uppercase text-xl font-bold">Open Everyday</h1>
                <h1 className="uppercase text-xl font-bold">10.00Am – 10.00Pm</h1>
            </div>
            
            {/* Link Button */}
            <Link 
              href={"/find-us"} 
              className="bg-black py-3 px-6 rounded-md w-fit self-center text-white font-bold text-lg hover:opacity-90 transition duration-300 ease-in-out"
            >
              GET DIRECTIONS
            </Link>
          </div>

        </div>

        <div className=" bg-[#1C2123] h-full w-full flex items-center justify-center p-8">
            <iframe loading="lazy"
				src="https://maps.google.com/maps?q=Block%20114%20Plot%204%2C%20Akiogun%20street%2C%20Oniru%2C%20Victoria%20island%2C%20Lagos%20state&#038;t=m&#038;z=15&#038;output=embed&#038;iwloc=near"
				title="Block 114 Plot 4, Akiogun street, Oniru, Victoria island, Lagos state"
				aria-label="Block 114 Plot 4, Akiogun street, Oniru, Victoria island, Lagos state"
                className="body-container w-full h-full min-h-[400px]"
			></iframe>
        </div>
      </div>
      <Services/>
      <Footer />
    </div>
  );
};

export default FindUS;
