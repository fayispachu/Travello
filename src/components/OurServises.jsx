import React, { useEffect } from "react";
import bikers from "../assets/bikers.jpg";
import groupice from "../assets/groupice.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

function OurServices() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // whether animation should happen only once
      easing: "ease-in-out", // optional
    });
  }, []);
  return (
    <>
      <div id="service" className="bg-gray-100 md:pt-10 pt-6 flex flex-col items-center">
        <h1 className="pb-6 font-extrabold md:text-4xl text-3xl font-[Poppins] text-gray-800 tracking-tight">
          Our Services
        </h1>

        <p data-aos="fade-up" className="text-center text-gray-600 max-w-2xl px-4 mb-10 text-[1.05rem] leading-relaxed">
          At <span className="text-[#33D69F] font-semibold">TravelConnect</span>
          , we believe the best stories come from unexpected friendships. We
          help you connect, travel, and share unforgettable journeys with fellow
          adventurers.
        </p>

        {/* Section 1 */}
        <div  className="flex flex-col md:flex-row w-full max-w-6xl px-4 gap-5 mb-8 items-center">
          <div data-aos="fade-right" className="w-full md:w-1/2 h-[35vh] flex items-center justify-center">
            <img
              src={bikers}
              alt="bikers"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>
          <div data-aos="fade-left" className="w-full md:w-1/2 h-[35vh] flex items-center justify-center px-4">
            <p className="text-center text-gray-700 text-lg font-medium leading-relaxed">
              "Meet strangers, ride as a team, and turn the road into
              unforgettable memories."
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl px-4 gap-5 mb-10 items-center">
          <div data-aos="fade-right" className="w-full md:w-1/2 h-[35vh] flex items-center justify-center px-4 order-2 md:order-1">
            <p className="text-center text-gray-700 text-lg font-medium leading-relaxed">
              "Laugh, explore, and bond with people from different walks of
              life—icebreakers are just the beginning."
            </p>
          </div>
          <div data-aos="fade-left" className="w-full md:w-1/2 h-[35vh] flex items-center justify-center order-1 md:order-2">
            <img
              src={groupice}
              alt="groupice"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServices;
