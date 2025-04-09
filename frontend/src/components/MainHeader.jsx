import React from "react";
import { assets } from "../assets/assets";

const MainHeader = () => {
  return (
    <div className={"flex flex-col sm:flex-row border border-gray-400 my-4"}>
      {/* Hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>

          <h1 className=' prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            Latest Arrivals
          </h1>

          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      {/* hero right side */}
      <img
        className='w-full sm:w-1/2 '
        // src={assets.Cover_img}
        src='https://res.cloudinary.com/dkacs23ct/image/upload/c_thumb,w_200,g_face/v1744195892/ifipscrb1sx0taexlnrr.png'
        alt='Product name'
      />
    </div>
  );
};

export default MainHeader;
