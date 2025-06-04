import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import defaultimage from "../assets/defProfile.jpg";
function Userloginsetup() {
  const { user } = useContext(UserContext);

  return (
    <div className="md:flex hidden items-center gap-6">
      {!user ? (
        <div className="flex items-center gap-1">
          <Link to={"/login"}>
            <button className="bg-[#33D69F] text-white font-semibold rounded-md px-5 py-3 border border-[#33D69F] transition duration-300 hover:bg-[#28a79c]">
              Login
            </button>
          </Link>
          <Link to={"/register"}>
            <button className="bg-white text-black font-semibold  rounded-md  px-4 py-3 border border-white transition duration-300 hover:bg-[#f1f1f1]">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-6 items-center">
          <Link to={"/profile"} className="flex items-center">
            <img
              className="w-12 h-12 rounded-full mr-2"
              src={user.profileImage || defaultimage}
              alt="Profile"
            />
            <h1 className="text-xl font-semibold text-white">{user.name}</h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Userloginsetup;
