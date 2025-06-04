import React, { useContext } from "react";
import userimage from "../assets/userimg.avif"; // User profile image
import { Link } from "react-router-dom";
import logout from "../assets/logout.png"; // Logout icon
import { UserContext } from "../context/UserContext";
import close from "../assets/close.png";

function Sidebar() {
  const { user, sidebarOpen, CloseSidebar } = useContext(UserContext);

  return (
    <>
      {sidebarOpen && (
        <div
          className={`fixed top-0 left-0 bg-[#33D69F] w-[70%] md:w-[300px] h-full z-50 p-6 rounded-r-lg shadow-xl transition-all transform md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex flex-col items-center gap-6">
            <img
              onClick={CloseSidebar}
              className="absolute right-5 w-6 opacity-90 hover:opacity-100 transition duration-300 cursor-pointer"
              src={close}
              alt="Close"
            />
            <Link to="/profile">
              <img
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                src={userimage}
                alt="User"
              />
              <h1 className="text-white text-2xl font-semibold font-[Poppins] tracking-wide">
                {user?.name}
              </h1>
              <p className="text-gray-100 text-sm font-medium opacity-90">
                {user?.email}
              </p>
            </Link>
          </div>

          <ul className="space-y-6 text-white">
            <li className="text-xl font-semibold hover:text-gray-100 transition duration-300 cursor-pointer font-[Montserrat]">
              <Link to="/">Home</Link>
            </li>
            <li className="text-xl font-semibold hover:text-gray-100 transition duration-300 cursor-pointer font-[Montserrat]">
              <Link to="/trips">Trips</Link>
            </li>
            <li className="text-xl font-semibold hover:text-gray-100 transition duration-300 cursor-pointer font-[Montserrat]">
              <Link to="/about">About Us</Link>
            </li>
            <li className="text-xl font-semibold hover:text-gray-100 transition duration-300 cursor-pointer font-[Montserrat]">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="text-xl font-semibold hover:text-gray-100 transition duration-300 cursor-pointer font-[Montserrat]">
              <Link to="/best-places">Best Places</Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-10 flex items-center justify-center text-white text-lg font-semibold hover:text-gray-100 transition duration-300 cursor-pointer">
            <img
              className="w-6 mr-2 opacity-90 hover:opacity-100"
              src={logout}
              alt="Logout"
            />
            <Link to="/login">Logout</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
