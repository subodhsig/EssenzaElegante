import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-4 px-[4%] bg-white shadow-md">
      {/* Logo */}
      <img src={assets.logo} className="w-20" alt="logo of threaded" />

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
