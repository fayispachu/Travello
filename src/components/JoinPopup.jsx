import { useContext, useState } from "react";
import { JoinTripContext } from "../context/JoinTripContext";
import { TripContext } from "../context/TripContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import closeIcon from "../assets/close.png";
import { FRONTEND_URL } from "../context/UserContext";

function JoinPopup() {
  const {
    joinPopup,
    handleJoinGroup,
    closePopup,
    joinStatus,
    setJoinStatus,
    joinedTrips,
  } = useContext(JoinTripContext);
  const { oneTrip: trip } = useContext(TripContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
      // const FRONTEND_URL = "http://localhost:4000/api/";

  if (!joinPopup) return null;

  const isJoined = joinedTrips?.includes(trip?._id);

  // Function to open chat after joining
  const handleOpenChat = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setJoinStatus("Please log in to access the chat.");
        setIsLoading(false);
        return;
      }
      if (!trip?._id) {
        setJoinStatus("Trip ID is missing.");
        setIsLoading(false);
        return;
      }
      const { data } = await axios.get(
        `${FRONTEND_URL}/api/chat/trip/${trip._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success && data.room) {
        navigate(`/chat/${data.room}`);
        setJoinStatus("");
        closePopup();
      } else {
        setJoinStatus(data.message || "Chat room not found.");
      }
    } catch (error) {
      console.error("Error opening chat:", error.response?.data || error);
      setJoinStatus(
        error.response?.data?.message ||
          "Failed to open chat. Try joining again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Modified handleJoinGroup to automatically open chat after joining
  const handleJoin = async () => {
    setIsLoading(true);
    setJoinStatus(""); // Clear previous status
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setJoinStatus("Please log in to join the trip.");
        setIsLoading(false);
        return;
      }
      if (!trip?._id) {
        setJoinStatus("Trip ID is missing.");
        setIsLoading(false);
        return;
      }
      // Call the existing handleJoinGroup to update the context
      await handleJoinGroup();
      // After successful join, automatically open the chat
      await handleOpenChat();
    } catch (error) {
      console.error("Error joining trip:", error.response?.data || error);
      setJoinStatus(
        error.response?.data?.message ||
          "Failed to join trip. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-[90%] sm:w-[500px] bg-white rounded-2xl shadow-2xl p-8 relative">
        <img
          src={closeIcon}
          alt="close"
          className="absolute top-4 right-4 cursor-pointer w-5 hover:scale-110 transition-transform"
          onClick={closePopup}
        />
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-3">
          {isJoined ? "Open the Adventure!" : "Join the Adventure!"}
        </h1>
        <p className="text-gray-600 text-center mb-6 px-2">
          {isJoined
            ? "You're already part of this trip group. Click below to open the chat and connect with fellow travelers."
            : "You're about to join this trip group. Click the button below to confirm your spot and start exploring with fellow travelers."}
        </p>
        <div className="flex justify-center">
          <button
            onClick={isJoined ? handleOpenChat : handleJoin}
            disabled={isLoading}
            className={`px-8 py-3 rounded-lg font-semibold shadow-md transition-colors duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isLoading ? "Joining..." : isJoined ? "Open" : "Join Now"}
          </button>
        </div>
        {joinStatus && (
          <p className="mt-6 text-center text-sm text-gray-500">{joinStatus}</p>
        )}
      </div>
    </div>
  );
}

export default JoinPopup;
