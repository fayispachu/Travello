import React from "react";
import profileicon from "../assets/boy.png";
function AdminNavbar() {
  return (
    <>
      <nav className="py-2  flex flex-row w-[100%] items-center">
        <h1 className="pl-10 pr-60 font-bold text-xl">Travel guys</h1>
        <input
          className="mr-96 bg-gray-100 py-2 px-4 rounded-full"
          type="text"
          placeholder="Search....."
        />{" "}
        <div className="flex items-center flex-row pl-64 gap-5">
          {" "}
          <h1 className="font-bold textlg">Fayiz.k</h1> <img src={profileicon} alt="" />
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
