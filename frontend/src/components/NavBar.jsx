import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { showSearch, setShowSearch, getCartCount, logout, token, navigate } =
    useContext(ShopContext);

  return (
    <div className='flex items-center justify-between pt-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} className='w-32' alt='logo' />
      </Link>

      <ul className='hidden sm:flex gap-8 text-sm text-gray-700'>
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
          <NavLink
            key={index}
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "border-b-2 border-pink-500 mb-1" : ""
              }`
            }
          >
            <p>{item}</p>
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-8'>
        <img
          onClick={() => {
            if (!location.pathname.includes("collection"))
              navigate("/collection");
            setShowSearch(!showSearch);
          }}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt='search icon'
        />

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5' alt='cart icon' />
          <p className='absolute bottom-[-11px] right-[-6px]  text-black text-[13px] font-semibold'>
            {getCartCount()}
          </p>
        </Link>

        <div className='group relative'>
          <Link to='/login'>
            <img
              src={assets.profile_icon}
              className='w-5 cursor-pointer'
              alt='profile icon'
            />
          </Link>
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-xl font-medium'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p
                  className='cursor-pointer hover:text-black'
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>

                <p
                  onClick={() => setShowLogoutModal(true)}
                  className='cursor-pointer hover:text-black'
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='menu icon'
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-3/4" : "w-0"
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img
              className='h-5 rotate-90'
              src={assets.dropdown_icon}
              alt='dropdown icon'
            />
            <p>Back</p>
          </div>
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className='py-2 pl-6 border'
              to={`/${item.toLowerCase()}`}
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>

      {showLogoutModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl mb-4'>Are you sure you want to log out?</h2>
            <div className='flex justify-end gap-6'>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  return;
                }}
                className='px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
