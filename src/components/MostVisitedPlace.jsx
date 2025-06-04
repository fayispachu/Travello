import React from "react";
import tempPlace from "../assets/tempplace.jpeg";

function MostVisitedPlace() {
  return (
    <div
      id="mostvisited"
      className="flex flex-col w-full items-center justify-center bg-[#33D69F]  py-10 px-4"
    >
      <h1 className="font-bold text-xl md:text-2xl mb-6 text-center">
        Most Visited Places
      </h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-6xl items-center justify-center">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex flex-row md:flex-col bg-white rounded-md shadow-md overflow-hidden w-full md:w-72 h-[110px] md:h-[60vh]"
          >
            <img
              src={tempPlace}
              alt="place"
              className="w-[40%] h-full object-cover md:w-full md:h-[30vh] md:rounded-t-md"
            />
            <div className="flex flex-col justify-center md:justify-start p-3 text-left w-[60%] md:w-full">
              <h2 className="font-semibold text-sm md:text-lg">Kashmir</h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                10/20/25 to 20/20/25
              </p>
              <p className="text-[10px] md:text-sm text-gray-500 mt-1 leading-tight">
                Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks, lakes &
                adventure!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostVisitedPlace;
