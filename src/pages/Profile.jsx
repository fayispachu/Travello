import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JoinedTrip from "../components/Joinedtrip";
import YourTrip from "../components/YourTrip";
import { UserContext } from "../context/UserContext";
import { TripContext } from "../context/TripContext";
import YourSaved from "../components/YourSaved";

function Profile() {
  const [yourTrip, setYourTrip] = useState(true);
  const [joinedTrip, setJoinedTrip] = useState(false);

  const { checkUser, user, setProfilepic } = useContext(UserContext);
  const { yourSaved, handleOpenYourSaved, handleCloseYourSaved } =
    useContext(TripContext);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen  bg-gradient-to-br from-[#f0fdf4] to-white flex flex-col items-center">
        {/* Profile Header */}
        <div className="w-full bg-[#33D69F] py-10 px-6 flex flex-col items-center shadow-md text-white">
          <div className="relative w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden mb-4">
            <label
              htmlFor="profile-upload"
              className="cursor-pointer w-full h-full block"
            >
              <img
                className="w-full h-full object-cover rounded-full"
                src={`${
                  user?.profileImage || "/default.jpg"
                }?v=${new Date().getTime()}`}
                alt="profile"
              />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setProfilepic(e);
              }}
            />
          </div>
          <h1 className="text-2xl font-bold font-[Montserrat]">
            Hello, {user?.name || "Traveler"} 👋
          </h1>
          <p className="text-sm mt-1">🌴 Based in Kerala</p>
          <p className="text-xs mt-1">I am super soft, I am a nice man!</p>
        </div>

        {/* Tabs Like Instagram */}
        <div className="w-full max-w-2xl mt-6 px-4 flex justify-around border-b border-gray-300">
          <button
            onClick={() => {
              setYourTrip(true);
              setJoinedTrip(false);
              handleCloseYourSaved();
            }}
            className={`py-3 flex-1 text-center text-sm font-medium ${
              yourTrip ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Your Trips
          </button>
          <button
            onClick={() => {
              setYourTrip(false);
              setJoinedTrip(true);
              handleCloseYourSaved();
            }}
            className={`py-3 flex-1 text-center text-sm font-medium ${
              joinedTrip ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Joined
          </button>
          
          <button
            onClick={() => {
              handleOpenYourSaved();
              setYourTrip(false);
              setJoinedTrip(false);
            }}
            className={`py-3 flex-1 text-center text-sm font-medium ${
              yourSaved ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Content Sections */}
        <div className="w-full max-w-6xl px-4 py-6">
          {yourTrip && <YourTrip />}
          {joinedTrip && <JoinedTrip />}
          {yourSaved && <YourSaved />}
        </div>
      </div>
    </>
  );
}

export default Profile;
