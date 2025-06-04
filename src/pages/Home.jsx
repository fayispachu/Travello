import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OurServises from "../components/OurServises";
import LatestTrips from "../components/LatestTrips";
import MostVisitedPlace from "../components/MostVisitedPlace";
import { UserContext } from "../context/UserContext";
import UserSection from "../components/UserSection";
import Footer from "../components/Footer";

function Home() {
  const { checkUser } = useContext(UserContext);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="relative flex items-center justify-center h-[80vh] md:h-[100vh] bg-[#33D69F]">
        <div className="absolute md:top-64 top-32 z-30 flex flex-col items-center gap-8 md:gap-12 text-white text-center px-4">
          <h1 className="font-semibold text-4xl md:text-6xl font-display tracking-tight leading-tight">
            Embark on Epic Journeys Together!
          </h1>

          <div className="text-lg md:text-2xl font-medium px-6 opacity-90">
            <p>
              "Turn Strangers into Travel Companions and Stories into Memories"
            </p>
          </div>
          <a href="#service">
            <button className="bg-white text-[#33D69F] transition duration-300 ease-in-out md:px-12 md:py-4 px-6 py-3 font-bold rounded-full shadow-lg transform hover:scale-105 hover:bg-gray-100">
              Start Your Adventure
            </button>
          </a>
        </div>
      </div>

      <OurServises />
      <LatestTrips />
      <UserSection />
      <MostVisitedPlace />
      <Footer />
    </>
  );
}

export default Home;
