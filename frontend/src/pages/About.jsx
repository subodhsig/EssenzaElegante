import React from "react";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.contact_img}
          alt='About Photo'
        />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>
            Welcome to <b> Essenza Elegant </b> Perfumes, where elegance meets
            excellence. Our mission is to bring you the finest fragrances,
            crafted with precision and passion. We believe that scent is a
            powerful expression of identity, and we're here to help you find the
            perfect fragrance to complement your style and personality. Our
            collections are carefully curated, offering a diverse range of
            scents that suit every mood, occasion, and preference.
          </p>
          <p>
            At Essenza Elegant Perfumes, your satisfaction is our priority. From
            the moment you explore our selection to the day your signature scent
            arrives, we are committed to delivering a seamless shopping
            experience. Our team stays ahead of fragrance trends, ensuring you
            have access to the most exquisite and captivating aromas. Thank you
            for choosing Trendify Perfumes—we’re honored to be a part of your
            fragrance journey.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            At Essenza Elegant, our mission is to empower you to express your
            individuality through exquisite fragrances. We believe that scent is
            a reflection of personality, and we are dedicated to bringing you
            high-quality, sophisticated perfumes that leave a lasting
            impression. Our carefully curated collection offers a diverse range
            of fragrances, allowing you to find the perfect aroma to complement
            your style and elevate your presence.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            At Essenza Elegant, Our vision is to be a global leader in the
            fragrance industry, renowned for elegance, quality, and innovation.
            We aspire to inspire confidence and evoke emotions through our
            signature scents, making Essenza Elegant the ultimate choice for
            personal expression and timeless sophistication..
          </p>
        </div>
      </div>
      <div className='py-4 text-xl'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col mb-20 text-sm md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            At Essenza Elegant, quality comes first. Every fragrance is
            meticulously crafted and tested to meet our high standards. Shop
            with confidence, knowing that we ensure excellence in every note and
            detail..
          </p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Convenience</b>
          <p className='text-gray-600'>
            Essenza Elegant ensures a smooth shopping experience with easy
            browsing, fast shipping, hassle-free returns, and multiple payment
            options. Your comfort and satisfaction are our top priorities..
          </p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            At Essenza Elegant, exceptional service is our promise. Our
            dedicated support team is here to assist you with any questions or
            concerns, ensuring a smooth and satisfying shopping experience.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
