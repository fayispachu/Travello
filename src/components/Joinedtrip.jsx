import { useContext, useEffect } from "react";
import { JoinTripContext } from "../context/JoinTripContext";
import userProfile from "../assets/boy.png";

function JoinedTrip() {
  const { joinedTrips, joinStatus, handleGetJoinedTrips } =
    useContext(JoinTripContext);

  useEffect(() => {
    handleGetJoinedTrips(); // Fetch on mount
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-12 bg-gradient-to-b from-navy to-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white font-[Montserrat] drop-shadow-lg">
        Your Joined Adventures
      </h2>

      {joinStatus && (
        <p className="text-center text-coral text-lg mb-6 bg-white/10 rounded-lg p-4 max-w-md mx-auto">
          {joinStatus}
        </p>
      )}

      {joinedTrips.length === 0 ? (
        <div className="text-center text-gray-600 text-lg animate-in">
          <p className="mb-4">You haven't joined any trips yet.</p>
          <a
            href="/"
            className="inline-block bg-coral text-white font-semibold px-6 py-2 rounded-full hover:bg-gold hover:text-gray-800 transition-all duration-200"
          >
            Explore Trips
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto">
          {joinedTrips.map((trip) => (
            <div
              key={trip._id}
              className="w-full max-w-[300px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
            >
              <img
                className="w-full h-48 object-cover"
                src={trip.image || "/default-trip.jpg"}
                alt={trip.place || "Trip"}
                loading="lazy"
              />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full border border-gray-200"
                    src={userProfile}
                    alt="Host"
                  />
                  <span className="text-sm font-semibold text-gray-700 truncate">
                    {trip.creatorName || "Trip Host"}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                  {trip.place || "Unknown Destination"}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {trip.details || "No details available."}
                </p>
                <a
                  href={`/chat/${trip.chatRoomId || ""}`}
                  className="mt-2 inline-block bg-coral text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gold hover:text-gray-800 transition-all duration-200 text-center"
                >
                  Join Chat
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JoinedTrip;
