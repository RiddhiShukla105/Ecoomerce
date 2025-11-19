import React from 'react'
import { Link } from 'react-router-dom'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';

const Nav = () => {
  return (
    <div className="bg-sky-950 px-8 py-2 shadow-md">
      <nav className="flex items-center justify-between">

        {/* Logo */}
        <div className="text-white text-3xl font-bold">
          <span className="text-4xl font-extrabold">E</span>kart
        </div>

        {/* Center Search Bar */}
        {/* <div className="flex-1 flex justify-center">
          <IconField
            iconPosition="left"
            className="bg-white rounded-full px-4  w-full max-w-xl"
          >
            <InputIcon className="pi pi-search"  />
            <InputText
              placeholder="Search for products"
              className="outline-none border-none w-full"
            />
          </IconField>
        </div> */}

        <div className='text-2xl text-white font-bold space-x-2'>A D M I N  P A N E L</div>
        {/* HAMBURGER BUTTON FOR MOBILE */}
     
        {/* Right Side Items */}
        <ul className="flex items-center gap-8 text-white text-lg  no-underline">
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 text-white decoration-0 transition no-underline mr-8"
            >
              Home
            </Link>
            <Link
              to="/verify"
              className="hover:text-gray-200 text-white decoration-0 transition no-underline"
            >
              Login
            </Link>
          </li>

          <li>
            <Avatar
              label="P"
              className="bg-white text-pink-600 font-bold"
              size="large"
              shape="circle"
            />
          </li>

          {/* <li>
            <i className="pi pi-moon text-2xl hover:text-gray-200 cursor-pointer"></i>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
