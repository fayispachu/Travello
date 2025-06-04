import { createContext } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FRONTEND_URL } from "./UserContext";
export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [oneTrip, setOneTrip] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrip, setFilteredTrip] = useState([]);
  const [trips, setTrips] = useState([]);
  const handleClose = () => {
    setIsOpen(false);
  };
  const [isPopup, setPopup] = useState(false);
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [yourSaved, setYourSaved] = useState(false);
  const [saveTrip, setSaveTrip] = useState([]);


// const FRONTEND_URL = "http://localhost:4000/api/"

  // save trip
  const handleSaveTrip = async (tripId) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `${FRONTEND_URL}/api/user/save-trip`,
        { tripId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSaveTrip(data.savedTrips);
      alert("Trip saved successfully");
      console.log(data.savedTrips);
      console.log(saveTrip);
    } catch (error) {
      console.log("Save trip error:", error);
      alert(error.response?.data?.msg || "Failed to save trip");
    }
  };
  // get saved trip
  const handleGetSavedTrips = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
          `${FRONTEND_URL}/api/user/get-savedtrips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Saved trips data:", data);

      setSaveTrip(data.savedTrips);
    } catch (error) {
      console.log("Failed to fetch saved trips", error);
    }
  };

  function openPopup() {
    setPopup(true);
  }
  function closePopup() {
    setPopup(false);
  }

  const handleAddImage = async (e) => {
    try {
      const image = e.target.files[0];
      if (!image) return console.log("poi image settkk");
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Trip_plan_imges");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );

      setImage(data.secure_url);
    } catch (error) {
      console.log(error, "Error from adding image trip front");
    }
  };

  const handleCreateTrip = async () => {
    if (!image || !place || !details) {
      console.log("All fields are required");
      return;
    }
    const createdTrip = {
      image: image,
      place,
      details,
      date,
    };
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
          `${FRONTEND_URL}trip/createtrip`,
        createdTrip,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      console.log(data.newTrip);
      setImage("");
      setPlace("");
      setDetails("");
      closePopup();
    } catch (error) {
      console.log(error, "Error from Creating trip front");
    }
  };

  // gerall trips
  const handleGetTrips = async () => {
    try {
      const { data } = await axios.get(
         `${FRONTEND_URL}/api/trip/alltrips?place=${searchTerm}`
      );
      setTrips(data.allTrips);
      setFilteredTrip(data.allTrips);
      console.log(data.searchTrips, "get all trips");
      if (data.allTrips.length > 0) {
        setOneTrip(data.allTrips[0]);
      }
      console.log(data.allTrips, "all trips ");
    } catch (error) {
      console.log("Error from frontend getAll Trips", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = trips.filter((trips) => trips.place);
      setFilteredTrip(filtered);
    }

    handleGetTrips();
  }, [searchTerm]);

  const handleOneTrip = async (id) => {
    if (!id) {
      console.error("Trip ID is missing");
      return;
    }

    try {
      const { data } = await axios.get(
         `${FRONTEND_URL}/api/trip/onetrip?id=${id}`
      );
      setOneTrip(data.trip);
    } catch (error) {
      console.warn("Trip not found");
      console.error("Error fetching trip details:", error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  function handleOpenYourSaved() {
    setYourSaved(true);
  }

  function handleCloseYourSaved() {
    setYourSaved(false);
  }
  return (
    <TripContext.Provider
      value={{
        saveTrip,

        handleSaveTrip,
        handleGetSavedTrips,
        yourSaved,
        handleCloseYourSaved,
        handleOpenYourSaved,
        handleClose,
        handleGetTrips,
        handleOneTrip,
        handleOpen,
        setSearchTerm,
        handleAddImage,
        setDate,
        handleCreateTrip,
        setImage,
        openPopup,
        date,
        setDetails,
        closePopup,
        setPlace,
        isOpen,
        filteredTrip,
        searchTerm,
        oneTrip,
        isPopup,
        trips,
      }}
    >
      {children}{" "}
    </TripContext.Provider>
  );
};
