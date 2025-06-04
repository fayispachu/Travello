import React from "react";
import UserSearch from "./UserSearch";

function UserSection() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between w-[90%] max-w-7xl gap-10">
        {/* Intro section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to TravelConnect 🌍
          </h1>
          <p className="text-gray-600 text-lg">
            Discover and connect with fellow travelers! Use the search tool to
            find users, view their profiles, and start planning amazing journeys
            together. Whether you're an adventurer or an agency, we've got
            something for you.
          </p>
          <ul className="mt-6 text-gray-500 list-disc list-inside space-y-2">
            <li>Create and share travel plans</li>
            <li>Join exciting trips with like-minded explorers</li>
            <li>Follow agencies and stay updated on new packages</li>
          </ul>
        </div>

        {/* User Search section */}
        <UserSearch />
      </div>
    </div>
  );
}

export default UserSection;
