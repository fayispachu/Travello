import React, { useContext, useState } from "react";
import userProfile from "../assets/boy.png";
import close from "../assets/close.png";
import { TripContext } from "../context/TripContext";

function CreatePopup() {
  const {
    isPopup,
    setDate,
    place,
    details,
    date,
    setDetails,
    closePopup,
    handleAddImage,
    handleCreateTrip,
    setPlace,
  } = useContext(TripContext);

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      handleAddImage(e);
    }
  };

  return (
    <>
      {isPopup && (
        <div className="fixed inset-0 z-50 text-black bg-white/70 flex justify-center items-center px-4 py-6 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-md shadow-xl p-5">
            <img
              className="absolute right-4 top-4 w-6 h-6 cursor-pointer"
              onClick={closePopup}
              src={close}
              alt="close"
            />

            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                className="w-10 h-10 rounded-full"
                src={userProfile}
                alt="user"
              />
              <h1 className="font-bold text-lg">Fayiz.k</h1>
            </div>

            {/* Form Inputs */}
            <div className="flex flex-col gap-3">
              {/* Custom Image Upload Field */}
              <label className="w-full h-48 hover:scale-105 transition-all bg-gray-100 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-center cursor-pointer overflow-hidden relative">
                {!previewImage && (
                  <div className="flex flex-col items-center text-gray-500">
                    <span className="text-sm">Add Image</span>
                  </div>
                )}
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 placeholder-black cursor-pointer"
                />
              </label>

              <input
                onChange={(e) => setPlace(e.target.value)}
                className="border rounded-md p-2 font-semibold placeholder-black"
                value={place}
                placeholder="Place name"
              />

              <input
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-md p-2 font-semibold"
                value={date}
                type="date"
                placeholder="Date"
              />

              <input
                onChange={(e) => setDetails(e.target.value)}
                className="border rounded-md p-2 placeholder-black"
                value={details}
                placeholder="Details"
              />

              <button
                onClick={handleCreateTrip}
                className="bg-black text-white rounded-md py-2 px-4 mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePopup;
