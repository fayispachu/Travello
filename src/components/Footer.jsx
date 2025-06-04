import React from "react";
import instagram from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";

function Footer() {
  return (
    <div
      id="contact"
      className="relative bg-white w-full py-10 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row md:gap-10 lg:gap-20"
    >
      {/* Branding & Social */}
      <div id="about" className="flex flex-col md:w-1/3 gap-6 mb-6 md:mb-0">
        <div>
          <h1 className="text-[#33D69F] font-bold text-2xl">Travel Guys</h1>
          <p className="text-sm md:text-base mt-2 text-gray-700">
            Travel with your random strangers
          </p>
        </div>
        <div>
          <h1 className="font-bold text-lg mb-2">Social</h1>
          <div className="flex gap-4">
            <img className="w-6 md:w-7" src={instagram} alt="instagram" />
            <img className="w-6 md:w-7" src={whatsapp} alt="whatsapp" />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:w-1/4 mb-6 md:mb-0">
        <h1 className="font-bold text-lg mb-2">Contact</h1>
        <ul className="text-sm md:text-base text-gray-700 space-y-1">
          <li>9744850680</li>
          <li>fayizpachu217@gmail.com</li>
        </ul>
      </div>

      {/* About Us */}
      <div className="flex flex-col md:w-2/5">
        <h1 className="font-bold text-lg mb-2">About Us</h1>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          At Travel Guys, we believe that the best journeys are shared. Our
          platform helps you discover like-minded adventurers, create travel
          plans, and explore the world together — even with complete strangers.
          Whether you're planning a spontaneous road trip or joining a curated
          group, we make connecting easy, safe, and unforgettable.
        </p>
      </div>

      {/* Go Back Button */}
      <div className="absolute right-6 top-6 md:right-10 md:top-10">
        <a href="/">
          <button className="bg-[#33D69F] text-white text-sm md:text-base px-4 py-2 rounded-md shadow-md hover:bg-[#2dc590] transition-colors">
            Go back
          </button>
        </a>
      </div>
    </div>
  );
}

export default Footer;
