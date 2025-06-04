import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";

function CreateButton() {
  const { openPopup } = useContext(TripContext);

  return (
    <>
      {/* <div className="absolute    flex  gap-1"> */}
      <button
        onClick={openPopup}
        className="bg-[#33D69F]  ml-5 drop-shadow-xl  rounded-md   px-3 py-3 text-white font-semibold border border-[#33D69F] "
      >
        Create
      </button>
      {/* </div> */}
    </>
  );
}

export default CreateButton;
