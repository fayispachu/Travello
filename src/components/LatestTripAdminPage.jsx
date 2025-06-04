import { useContext } from "react";
import { TripContext } from "../context/TripContext";

function LatestTripAdminPage() {
  const { trips, searchTerm, setSearchTerm } = useContext(TripContext);

  return (
    <>
      {trips.length === 0 && (
        <p className="text-center text-red-500 font-semibold mt-4">
          No trips found for "{searchTerm}"
        </p>
      )}

      <div
        id="trips"
        className="bg-white w-[90%] h-[70vh] ml-16 px-7 py-4 overflow-x-auto rounded-xl shadow-md"
      >
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center px-5 pb-4 border-b">
          <h1 className="font-bold text-2xl text-gray-800">Recent Trips</h1>
          <div className="flex flex-row items-center gap-4">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="bg-gray-100 rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-[#33D69F]"
              placeholder="Search..."
            />
            <button className="bg-[#33D69F] text-white px-5 py-2 rounded-md hover:bg-[#2bbd8c] transition-all">
              View all
            </button>
          </div>
        </div>

        {/* Table Headings */}
        <div className="flex flex-row items-center justify-between py-3 font-bold text-sm text-gray-600 bg-gray-100 px-10 mt-3 rounded-md">
          <h1 className="w-40">Place</h1>
          <h1 className="w-40">Creator Name</h1>
          <h1 className="w-32">Date</h1>
          <h1 className="w-40 text-center">Number of People</h1>
        </div>

        {/* Trip Rows */}
        {trips.map((trip, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between py-3 px-10 text-gray-700 border-b font-semibold hover:bg-gray-50 transition"
          >
            <div className="w-40 truncate">{trip.place}</div>
            <div className="w-40 truncate">{trip.name}</div>
            <div className="w-32">{trip.date}</div>
            <div className="w-40 text-center">Number of People</div>
          </div>
        ))}

        <div className="border-t border-gray-300 mt-2"></div>
      </div>
    </>
  );
}

export default LatestTripAdminPage;
