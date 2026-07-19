import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] py-10 px-10 flex justify-end">
  <div className="flex flex-col gap-5">
    <a
      href="https://facebook.com"
      className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-blue-600 transition"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://instagram.com"
      className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-pink-600 transition"
    >
      <FaInstagram />
    </a>

    <a
      href="https://t.me/"
      className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-sky-500 transition"
    >
      <FaTelegramPlane />
    </a>
  </div>
</footer>
  );
};

export default Footer;