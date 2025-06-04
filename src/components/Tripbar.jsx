import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import rightarrow from "../assets/rightarrow.png";
import tempplace from "../assets/tempplace.jpeg";
import MoreAboutCard from "./MoreAboutCard";

function Tripbar() {
  const { trips, handleOneTrip, handleOpen, searchTerm, oneTrip, handleClose } =
    useContext(TripContext);
  const [showMoreCard, setShowMoreCard] = useState(false);
  const openMoreCard = () => setShowMoreCard(true);
  const closeMoreCard = () => setShowMoreCard(false);

  return (
    <>
      {trips.length === 0 && (
        <p className="text-center  text-red-500 font-semibold mt-4">
          No trips found for "{searchTerm}"
        </p>
      )}

      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 w-full max-h-[80vh] overflow-y-auto scrollbar-hidden">
        {trips.map((trip, index) => (
          <div
            key={index}
            onClick={async () => {
              await handleOneTrip(trip._id);
              handleOpen();
              openMoreCard();
            }}
            className="bg-white text-black rounded-2xl flex flex-col gap-2  cursor-pointer hover:scale-[1.02] transition-transform duration-200 w-full"
          >
            <img
              className="h-28 w-full object-cover rounded-t-xl"
              src={trip.image || tempplace}
              alt="Trip"
            />
            <div className="flex-1 flex flex-col gap-1 p-2 overflow-hidden">
              <p className="text-xs text-gray-400">{trip.date}</p>
              <h1 className="text-base font-semibold truncate">{trip.place}</h1>
              <p className="text-sm text-gray-300 line-clamp-2">
                {trip.details}
              </p>
            </div>
            <div className="flex justify-end">
              <img className="w-4 h-4 invert" src={rightarrow} alt=">" />
            </div>
          </div>
        ))}
      </div>

      {showMoreCard && oneTrip && (
        <MoreAboutCard
          oneTrip={oneTrip}
          closeMoreCard={() => {
            closeMoreCard();
            handleClose();
          }}
        />
      )}
    </>
  );
}

export default Tripbar;
