"use client";

import React from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-gray-50 w-full flex md:flex-row flex-col justify-around items-start p-10">
        <div className="p-2">
          <ul>
            <p className="text-gray-800 font-bold text-xl pb-4">
              F-<span className="text-airbnb">Shujaa</span>
            </p>
            <div className="flex gap-4 pb-3">
              <FaInstagram className="text-xl cursor-pointer hover:text-fuchsia-800" />
              <FaLinkedin className="text-xl cursor-pointer hover:text-blue-600" />
              <FaYoutube className="text-xl cursor-pointer hover:text-red-600" />
            </div>
          </ul>
        </div>
        <div className="p-2">
          <ul>
            <p className="text-gray-800 font-bold text-lg pb-2">Sections</p>
            <li className="text-gray-500 text-sm pb-1 font-semibold hover:text-airbnb-dark cursor-pointer">
              Home
            </li>
            <li className="text-gray-500 text-sm pb-1 font-semibold hover:text-airbnb-dark cursor-pointer">
              About
            </li>
            <li className="text-gray-500 text-sm pb-1 font-semibold hover:text-airbnb-dark cursor-pointer">
              User Testimonials
            </li>
          </ul>
        </div>
        <div className="p-2">
          <ul>
            <p className="text-gray-800 font-bold text-lg pb-2">Contact Us</p>
            <li className="text-gray-500 text-sm pb-1 font-semibold hover:text-airbnb-dark cursor-pointer">
              Email: futureshujaa@gmail.com
            </li>
            <li className="text-gray-500 text-sm pb-1 font-semibold hover:text-airbnb-dark cursor-pointer">
              Phone: 0726123512
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-3 bg-gray-50">
        <h1 className="text-gray-800 text-sm font-semibold">
          © 2024 All rights reserved
        </h1>
      </div>
    </>
  );
};

export default Footer;
