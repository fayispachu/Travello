import React from "react";

function AdminSidebar() {
  return (
    <>
      <div className="w-40 h-[100vh] flex flex-col  p-1 gap-1  ">
        <button className="bg-[#33D69F] py-2 mb-5">Dashboard</button>
        <button className="hover:bg-[#33D69F] bg-gray-100 py-2  ">
          Total Users
        </button>
        <button className="hover:bg-[#33D69F] bg-gray-100 py-2">
          Recent Trips
        </button>
        <button className="hover:bg-[#33D69F] bg-gray-100 py-2 ">
          User control
        </button>
        <button className="hover:bg-[#33D69F] bg-gray-100 py-2 ">
          Ratings
        </button>

        <button className="hover:bg-[#33D69F] bg-gray-100 mt-36 py-2">
          Log out
        </button>
      </div>
    </>
  );
}

export default AdminSidebar;
