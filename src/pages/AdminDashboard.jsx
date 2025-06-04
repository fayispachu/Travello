import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import LatestTripAdminPage from "../components/LatestTripAdminPage";
import rating from "../assets/rating.png";
import stars from "../assets/graph.png";
import users from "../assets/group.png";
// import Profile from "../components/Profile";
function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row">
        {" "}
        <AdminSidebar />
        <div className="bg-[#DDF3F9] w-screen">
          <div className="flex flex-row">
            {" "}
            <div className="w-52 h-32 bg-white m-5  ml-16 rounded-md ">
              <div className="flex flex-row items-center">
                {" "}
                <h1 className="font-bold text-xl p-5">Total users</h1>
                <img className="w-12 h-12" src={users} alt="" />
              </div>
              <h1 className="font-bold text-3xl ml-20">1,500+</h1>
            </div>
            <div className="w-52 h-32 bg-white m-5 ml-16  rounded-md ">
              <h1 className="font-bold text-xl p-5">Recent trips</h1>
            </div>
            <div className="w-52 h-32 bg-white m-5 ml-16  rounded-md ">
              <h1 className="font-bold text-xl p-5">Total trips</h1>
            </div>
            <div className="w-52 h-32 bg-white m-5 ml-16 rounded-md ">
              <div className="flex flex-row pt-3 gap-3 items-center">
                <h1 className="font-bold text-xl pl-10">Reviws</h1>
                <img className="w-12 " src={rating} alt="" />
              </div>
              <img className="ml-16 w-24 mt-2 " src={stars} alt="" />
            </div>
            {/* <Profile />{" "} */}
          </div>
          <LatestTripAdminPage />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
