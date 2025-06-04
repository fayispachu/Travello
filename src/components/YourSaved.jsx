import React, { useContext, useEffect, useState } from "react";
import { TripContext } from "../context/TripContext";
import MoreAboutCard from "./MoreAboutCard";

function YourSaved() {
  const { saveTrip, handleGetSavedTrips, handleOneTrip, oneTrip, handleClose } =
    useContext(TripContext);
  const [showMoreCard, setShowMoreCard] = useState(false);

  useEffect(() => {
    handleGetSavedTrips();
  }, []);

  const openMoreCard = async (tripId) => {
    await handleOneTrip(tripId);
    setShowMoreCard(true);
  };

  const closeMoreCard = () => {
    setShowMoreCard(false);
    handleClose();
  };

  return (
    <div className="w-full min-h-[60vh] px-4 py-10 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 font-[Montserrat]">
        Your Saved Trips
      </h2>

      {saveTrip.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No saved trips found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {saveTrip.map((trip) => (
            <div
              key={trip._id}
              onClick={() => openMoreCard(trip._id)}
              className="w-full max-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden flex flex-col"
            >
              <img
                className="w-full h-40 object-cover"
                src={trip.image}
                alt="Trip"
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="text-xs text-gray-500">{trip.date}</p>
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {trip.place}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {trip.details}
                </p>
               
              </div>
            </div>
          ))}
        </div>
      )}

      {showMoreCard && oneTrip && (
        <MoreAboutCard oneTrip={oneTrip} closeMoreCard={closeMoreCard} />
      )}
    </div>
  );
}

export default YourSaved;
