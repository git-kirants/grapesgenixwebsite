import Signdialog from "./Signdialog"; // Login Button
import Registerdialog from "./Registerdialog"; // Register Button
// Define the type for the Banner component props
interface BannerProps {
  isAuthenticated: boolean;
}

const Banner = ({ isAuthenticated }: BannerProps) => {
    return (
      <div id="home-section" className="bg-gradient-to-b from-lightkblue to-white">
        <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
            <div className="col-span-6 flex flex-col justify-center items-center lg:items-start">
              <h1 className="text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-2 lg:pt-0">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[#B08BFF] to-[#5A2D8C] text-transparent bg-clip-text">
                  GrapesGenix
                </span>{" "}
                Technical Solutions Pvt Ltd
              </h1>
  
              {!isAuthenticated && (
                <div className="flex justify-center lg:justify-start gap-x-1 mt-4">
                  <Signdialog />
                  <Registerdialog />
                </div>
              )}
            </div>
  
            <div className="col-span-6 flex justify-center">
              <img src="/assets/banner/Girl.svg" alt="nothing" width={1000} height={805} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Banner;
