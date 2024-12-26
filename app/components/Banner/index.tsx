import Image from 'next/image';
import Signdialog from './Signdialog'; // Correct import path
import Registerdialog from './Registerdialog';

const Banner = () => {
    return (
        <div id="home-section" className='bg-gradient-to-b from-lightkblue to-white'>
            <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
                <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1'>
                    <div className='col-span-6 flex flex-col justify-center items-center lg:items-start'>
                        {/* Welcome Text */}
                        <h1 className='text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-2 lg:pt-0'>
    Welcome to <span className='text-[#7E1F86]'>GrapesGenix</span> Technical Solutions Pvt Ltd
</h1>



                        {/* Login and Register Buttons */}
                        <div className="flex justify-center lg:justify-start gap-4 mt-4">
                            <Signdialog /> {/* Login Button */}
                            <Registerdialog /> {/* Register Button */}
                        </div>
                    </div>

                    {/* Banner Image */}
                    <div className='col-span-6 flex justify-center'>
                        <Image src="/assets/banner/Girl.png" alt="nothing" width={1000} height={805} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;
