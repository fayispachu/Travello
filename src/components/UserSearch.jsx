import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import search from "../assets/profile.png";
import defProfile from "../assets/defProfile.jpg";

function UserSearch() {
  const { setSearchUser, filteredUser } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full md:w-1/2">
      {/* Search Bar */}
      <div className="w-full flex items-center justify-center gap-3 mb-6">
        <input
          type="text"
          onChange={(e) => setSearchUser(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#33D69F]"
          placeholder="Search users..."
        />
        <button className="bg-[#33D69F] p-3 rounded-lg hover:bg-[#28c08e] transition">
          <img src={search} alt="Search" className="w-6 h-6" />
        </button>
      </div>

      {/* Results Box */}
      <div className="h-[75vh] w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 overflow-y-auto">
        {filteredUser.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredUser.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <img
                  src={user?.profileImage || defProfile}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <h1 className="text-lg font-semibold text-gray-800">
                  {user?.name}
                </h1>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
