import React, { useEffect, useState } from "react";
import axios from "axios";
import userProfile from "../assets/boy.png"; // Or your default profile image

function YourTrip() {
  const [myTrip, setMyTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMyTrip = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trip/mytrip`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyTrip(data.myTrip);
    } catch (error) {
      console.error("Error in getMyTrip:", error);
      setError("Error fetching trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMyTrip();
  }, []);

  return (
    <div className="w-full min-h-[60vh] px-4 py-10 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 font-[Montserrat]">
        My Created Trips
      </h2>

      {loading && (
        <p className="text-center text-blue-500 text-lg">Loading...</p>
      )}

      {error && <p className="text-center text-red-600 text-lg">{error}</p>}

      {!loading && myTrip.length === 0 && !error ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't created any trips yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {myTrip.map((trip) => (
            <div
              key={trip._id}
              className="w-full max-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <img
                className="w-full h-40 object-cover"
                src={trip.image || "/default-trip.jpg"}
                alt="Trip"
              />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={trip.profile || userProfile}
                    alt="User"
                  />
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {trip.name || "You"}
                  </span>
                </div>
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
    </div>
  );
}

export default YourTrip;
