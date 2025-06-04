import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URL, UserContext } from "./UserContext";
import { TripContext } from "./TripContext";

export const JoinTripContext = createContext();

export const JoinTripProvider = ({ children }) => {
  const [joinStatus, setJoinStatus] = useState("");
  const [joinPopup, setJoinPopup] = useState(false);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const { user, updateJoinedUser } = useContext(UserContext) || {};
  const { oneTrip: trip } = useContext(TripContext) || {};
  const navigate = useNavigate();

  // const FRONTEND_URL ="http://localhost:4000/api/"

  const fetchJoinedTrips = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      setJoinStatus("Please log in to view joined trips.");
      return;
    }
    try {
      const { data } = await axios.get(`${FRONTEND_URL}/api/chat/joined-trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Joined trips response:", data);
      if (data.success && Array.isArray(data.joinedTrips)) {
        setJoinedTrips(data.joinedTrips); // Store full trip objects
        data.joinedTrips.forEach((trip) => {
          if (!joinedTrips.some((t) => t._id === trip._id)) {
            updateJoinedUser(trip._id);
          }
        });
      } else {
        setJoinedTrips([]);
        setJoinStatus("No joined trips found.");
      }
    } catch (error) {
      console.error(
        "Failed to fetch joined trips:",
        error.response?.data || error
      );
      setJoinStatus(
        error.response?.data?.message || "Failed to load joined trips."
      );
    }
  };

  useEffect(() => {
    fetchJoinedTrips();
  }, [user]); // Removed updateJoinedUser to avoid infinite loop

  const handleJoinGroup = async () => {
    if (!user || !localStorage.getItem("token")) {
      setJoinStatus("Please log in to join a trip.");
      return;
    }
    if (!trip?._id) {
      setJoinStatus("Trip ID missing.");
      return;
    }
    if (joinedTrips.some((t) => t._id === trip._id)) {
      setJoinStatus("Already joined this group.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `${FRONTEND_URL}/api/chat/join`,
        { tripId: trip._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success && data.room) {
        setJoinedTrips((prev) => [...prev, trip]); // Add full trip object
        updateJoinedUser(trip._id);
        setJoinStatus("Joined successfully!");
        setJoinPopup(false);
        navigate(`/chat/${data.room}`);
      } else {
        setJoinStatus(data.message || "Failed to join group.");
      }
    } catch (error) {
      console.error("Join error:", error.response?.data || error);
      setJoinStatus(error.response?.data?.message || "Failed to join group.");
    }
  };

  const handleGetJoinedTrips = fetchJoinedTrips; // Expose for manual refresh if needed

  return (
    <JoinTripContext.Provider
      value={{
        joinStatus,
        setJoinStatus,
        joinPopup,
        openPopup: () => setJoinPopup(true),
        closePopup: () => setJoinPopup(false),
        handleJoinGroup,
        joinedTrips,
        handleGetJoinedTrips,
      }}
    >
      {children}
    </JoinTripContext.Provider>
  );
};
