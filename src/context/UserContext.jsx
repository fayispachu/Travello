import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();
export const FRONTEND_URL =
  "https://travel-with-strangers-final-project-2.onrender.com";

export const UsersDetailsProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [joinedUser, setJoinedUser] = useState(null);

  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${FRONTEND_URL}/api/user/users?name=${searchUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(data.users || []);
      setFilteredUser(data.users || []);
      console.log(data.users, "Get user axios log");
    } catch (error) {
      console.log(error, "Error fetching users");
      setUsers([]);
      setFilteredUser([]);
    }
  };

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${FRONTEND_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.doc) {
        setUser(data.doc);
        console.log(data.doc, "User profile fetched");
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error, "Error fetching user profile");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const setProfilepic = async (e) => {
    const image = e.target.files[0];
    if (!image) return alert("Please select an image to upload.");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Trip_plan_imges");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );

      if (!data || !data.secure_url) {
        alert("Image upload failed.");
        return;
      }

      const imageUrl = data.secure_url;
      setProfile(imageUrl);
      console.log(imageUrl, "Image URL received");

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${FRONTEND_URL}user/update/profile`,
        { profilepic: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data.success) {
        alert("Profile update failed");
        return;
      }

      setUser(res.data.data);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to upload profile picture");
      console.log(error, "Profile upload error");
    }
  };

  const checkJoinedUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const { data } = await axios.get(`${FRONTEND_URL}/api/user/joineduser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.joinedUser) {
        setJoinedUser(data.joinedUser);
        console.log(data.joinedUser, "Joined user fetched");
      }
    } catch (error) {
      console.log(error, "Error fetching joined user");
      setJoinedUser(null);
    }
  };

  const updateJoinedUser = (tripId) => {
    setJoinedUser((prev) => {
      if (!prev) return [tripId];
      if (!prev.includes(tripId)) return [...prev, tripId];
      return prev;
    });
  };

  useEffect(() => {
    checkUser();
    getUser();
    checkJoinedUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [searchUser]);

  const OpenSidebar = () => setSidebarOpen(true);
  const CloseSidebar = () => setSidebarOpen(false);

  return (
    <UserContext.Provider
      value={{
        sidebarOpen,
        OpenSidebar,
        CloseSidebar,
        users,
        profile,
        setProfilepic,
        user,
        setUser,
        loading,
        checkUser,
        setSearchUser,
        filteredUser,
        checkJoinedUser,
        joinedUser,
        updateJoinedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
