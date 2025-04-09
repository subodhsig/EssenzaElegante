import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <Link to='/'>
            <img
              src={assets.logo}
              className='w-32 mb-5 cursor-pointer'
              alt='Trendify'
            />
          </Link>
          <p className='w-full text-gray-600 md:w-2/3'>
            Thank you for shopping with Essenza Elegant! We’re committed to
            bringing you luxurious fragrances crafted with the finest
            ingredients. Follow us on social media for updates on new arrivals,
            exclusive offers, and more. If you have any questions or need
            assistance, our friendly customer support team is always here to
            help. Subscribe to our newsletter for special discounts and be the
            first to discover our latest collections. Your fragrance journey
            starts here—let’s make it unforgettable!
          </p>
        </div>

        <div>
          <p className='mb-5 text-xl font-medium'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to='/about'>
              <li>About Us</li>
            </Link>
            <Link to='/about'>
              <li>Delivery</li>
            </Link>
            <Link to='/about'>
              <li>Privacy & Policy</li>
            </Link>
          </ul>
        </div>

        <div>
          <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+977-9840000012</li>
            <li>contact.essenzaelegant@info.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2024 Essenza Elegant. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
