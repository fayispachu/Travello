import React, { useContext } from "react";
import CreatePopup from "../components/CreatePopup";
import Tripbar from "./Tripbar";
import { TripContext } from "../context/TripContext";
import CreateButton from "./CreateButton";
import search from "../assets/profile.png";

function LatestTrips() {
  const { setSearchTerm } = useContext(TripContext);

  return (
    <div
      id="trips"
      className="flex flex-col md:flex-row w-full min-h-screen pt-10 gap-6 px-4 sm:px-6 md:px-10 bg-[#33D69F] text-white"
    >
      {/* Left Side */}
      <div className="flex flex-col w-full md:w-[50%] md:ml-24 space-y-6 ">
        <div className="flex flex-row w-full justify-center md:justify-start md:ml-3">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white text-black drop-shadow-2xl placeholder-black rounded-full h-10 md:h-12 px-6 w-2/3 md:w-1/2"
            placeholder="Search trips..."
          />
          <button className="bg-white hover:bg-gray-200 drop-shadow-2xl px-5 h-10 md:h-12 rounded-full ml-3 transition-colors">
            <img src={search} alt="Search" className="w-5 h-5" />
          </button>
        </div>
        <Tripbar />
      </div>

      {/* Right Side */}
      <div className="relative w-full md:w-[50%] flex flex-col justify-center items-start px-4 md:px-6 space-y-6">
        <div className="absolute top-2 right-4 md:top-0 md:right-0">
          <CreateButton />
        </div>
        <div ata-aos="zoom-out-left" className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Welcome to TravelConnect 🌍
          </h1>
          <p className="text-gray-100 md:text-gray-200 text-base md:text-lg">
            Discover and connect with fellow travelers! Use the search tool to
            find users, view their profiles, and start planning amazing journeys
            together. Whether you're an adventurer or an agency, we've got
            something for you.
          </p>
          <ul className="mt-4 text-white text-sm md:text-base list-disc list-inside space-y-2">
            <li>Create and share travel plans</li>
            <li>Join exciting trips with like-minded explorers</li>
            <li>Follow agencies and stay updated on new packages</li>
          </ul>
        </div>
        <CreatePopup />
      </div>
    </div>
  );
}

export default LatestTrips;
