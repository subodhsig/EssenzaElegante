import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28'>
        <img
          className='w-full md:max-w-[480px]'
          src={assets.contact_img}
          alt='Contact Photo'
        />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='text-xl font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            Essenza Elegant <br />
            Kathmandu, Nepal
          </p>
          <p className='text-gray-500'>
            Tel: (+977)-063-000012
            <br />
            Email: contact.essenzaelegenate@info.com
          </p>
          <p className='text-xl font-semibold text-gray-600'>
            Careers at Forever
          </p>
          <p className='text-gray-500'>
            Join us at Essenza Elegant! Explore job opportunities and be part of
            a brand that redefines luxury and elegance. <br />
            Discover our current openings and see how you can contribute to our
            mission of crafting unforgettable fragrances and inspiring
            confidence through scent.
          </p>
          <button className='px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-gray-800 hover:text-white'>
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
