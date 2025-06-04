import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TripContext } from "../context/TripContext";
import { FRONTEND_URL, UserContext } from "../context/UserContext";

function Chat() {
  const { roomId } = useParams();
  const { oneTrip } = useContext(TripContext) || {};
  const { user, joinedUser } = useContext(UserContext) || {};
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const endRef = useRef(null);
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [exited, setExited] = useState(false);
  const [addUserEmail, setAddUserEmail] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const navigate = useNavigate();
  // const FRONTEND_URL = "http://localhost:4000/api/";
  // Check if user is admin
  const isAdmin =
    user?._id && admin?._id
      ? user._id.toString() === admin._id.toString()
      : false;

  const fetchChatData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(
        `${FRONTEND_URL}/api/chat/${roomId}/members`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("fetchChatData response:", response.data);
      const membersArray = Array.isArray(response.data.members)
        ? response.data.members
        : [];
      setMembers(membersArray);
      setAdmin(response.data.admin || null);
      console.log("isAdmin:", isAdmin);
    } catch (err) {
      console.error("Chat initialization error:", err);
      setMembers([]);
      setAdmin(null);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${FRONTEND_URL}/api/chat/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = res.data.messages.map((msg) => ({
        text: msg.text,
        sender: msg.sender.name || msg.sender.username || "Unknown",
        time: new Date(msg.createdAt),
        fromSelf: msg.sender._id === user?._id,
        id: msg._id || `${msg.sender._id}-${msg.createdAt}`,
      }));
      setMessages(formatted);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const initSocket = () => {
    if (socket.current) {
      socket.current.disconnect();
    }
    const token = localStorage.getItem("token");
    socket.current = io("http://localhost:4000", {
      auth: { token },
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });

    socket.current.on("connect", () => {
      if (roomId) {
        socket.current.emit("join_room", roomId);
        setMembers((prev) => {
          if (!prev.some((m) => m._id === user?._id)) {
            return [...prev, { _id: user?._id, name: user?.name || "You" }];
          }
          return prev;
        });
      }
    });

    socket.current.on("receive_message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: data.sender,
          time: new Date(data.timestamp),
          fromSelf: data.senderId === user?._id,
          id: data.messageId || `${data.senderId}-${data.timestamp}`,
        },
      ]);
    });

    socket.current.on("user_joined", (joinedUser) => {
      setMembers((prev) => {
        if (!prev.some((u) => u._id === joinedUser.userId)) {
          return [...prev, { _id: joinedUser.userId, name: joinedUser.name }];
        }
        return prev;
      });
    });

    socket.current.on("user_added", (addedUser) => {
      setMembers((prev) => {
        if (!prev.some((u) => u._id === addedUser.userId)) {
          return [...prev, { _id: addedUser.userId, name: addedUser.name }];
        }
        return prev;
      });
    });

    socket.current.on("user_removed", (removedUserId) => {
      setMembers((prev) => prev.filter((m) => m._id !== removedUserId));
    });

    socket.current.on("user_exited", (exitedUserId) => {
      if (exitedUserId !== user?._id) {
        setMembers((prev) => prev.filter((m) => m._id !== exitedUserId));
      }
    });
  };

  useEffect(() => {
    console.log("User:", user);
    console.log("JoinedUser (trips):", joinedUser);
    console.log("Admin:", admin);
    setExited(false); // Reset exited on mount
    fetchChatData();
    fetchMessages();
    initSocket();
    return () => {
      socket.current?.disconnect();
    };
  }, [roomId, user]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || exited) return;
    socket.current.emit(
      "send_message",
      { room: roomId, message: message.trim() },
      (response) => {
        if (response.status === "ok") {
          setMessages((prev) => [
            ...prev,
            {
              text: message.trim(),
              sender: user?.name || "You",
              time: new Date(),
              fromSelf: true,
              id: `temp-${Date.now()}`,
            },
          ]);
          setMessage("");
        } else {
          alert(`Failed to send: ${response.message}`);
        }
      }
    );
  };

  const handleExitGroup = async () => {
    if (isAdmin) {
      alert("Admins cannot exit the group.");
      return;
    }
    try {
      await axios.post(
        `${FRONTEND_URL}chat/${roomId}/exit`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setExited(true);
      socket.current.emit("user_exited", { room: roomId, userId: user?._id });
      alert("You have exited the group.");
      setShowDrawer(false);
      navigate(-1);
    } catch (err) {
      alert(
        "Failed to exit group: " + (err.response?.data?.message || err.message)
      );
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    try {
      const userRes = await axios.get(
        `${FRONTEND_URL}user/users?name=${addUserEmail}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const foundUser = userRes.data.users.find(
        (u) => u.email === addUserEmail
      );
      if (!foundUser) {
        alert("User not found");
        return;
      }

      const res = await axios.post(
        `${FRONTEND_URL}chat/${roomId}/add-user`,
        { userId: foundUser._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        setMembers((prev) => [
          ...prev,
          { _id: foundUser._id, name: foundUser.name },
        ]);
        socket.current.emit("user_added", {
          room: roomId,
          userId: foundUser._id,
          name: foundUser.name,
        });
        setAddUserEmail("");
        setShowAddUserModal(false);
        alert("User added successfully");
      }
    } catch (err) {
      alert(
        "Failed to add user: " + (err.response?.data?.message || err.message)
      );
      console.error(err);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const res = await axios.post(
        `${FRONTEND_URL}chat/${roomId}/remove-user`,
        { userId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        setMembers((prev) => prev.filter((m) => m._id !== userId));
        socket.current.emit("user_removed", { room: roomId, userId });
        alert("User removed successfully");
      }
    } catch (err) {
      alert(
        "Failed to remove user: " + (err.response?.data?.message || err.message)
      );
      console.error(err);
    }
  };

  const handleGoBack = () => {
    socket.current.disconnect(); // Disconnect socket to avoid stale connections
    navigate(-1);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-white font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for large screens */}
        <aside className="hidden md:block w-80 bg-white border-r border-gray-200 p-6">
          <h3 className="text-2xl font-extrabold text-green-500 mb-4 font-[Poppins] tracking-wide">
            Admin: {admin?.name || admin?.username || "Loading..."}
          </h3>
          <h3 className="text-xl font-bold text-green-500 mb-4 font-[Poppins] tracking-wide">
            Members ({members.length})
          </h3>
          <ul className="space-y-3">
            {members.map((m, i) => (
              <li
                key={m._id ?? i}
                className="py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-[Montserrat] flex justify-between items-center hover:bg-gray-200 transition-colors duration-200"
              >
                {m.name || m.username || "Unknown"}
                {isAdmin && m._id !== user?._id && (
                  <button
                    onClick={() => handleRemoveUser(m._id)}
                    className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isAdmin && (
            <button
              onClick={() => setShowAddUserModal(true)}
              className="mt-6 w-full py-3 rounded-lg font-bold text-white bg-green-500 hover:bg-green-600 font-[Montserrat] shadow-md transition-colors duration-300"
            >
              Add User
            </button>
          )}
          <button
            onClick={handleExitGroup}
            disabled={exited || isAdmin}
            className={`mt-3 w-full py-3 rounded-lg font-bold text-white font-[Montserrat] shadow-md transition-colors duration-300 ${
              exited || isAdmin
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Exit Group
          </button>
        </aside>

        {/* Chat section */}
        <section className="flex-1 flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold shadow-md transition-colors duration-300"
                aria-label="Go Back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-3xl font-extrabold text-green-500 font-[Poppins] tracking-wide">
                Trip Chat — {oneTrip?.place || "Loading..."}
              </h2>
            </div>
            <button
              onClick={() => setShowDrawer((prev) => !prev)}
              aria-label="Menu"
              className="md:hidden bg-transparent border-none cursor-pointer text-4xl text-green-500 hover:text-green-600 transition-colors duration-300"
            >
              ☰
            </button>
          </div>

          <div className="flex-1 rounded-lg p-6 bg-white border border-gray-200 shadow-md overflow-y-auto mb-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`my-3 flex ${
                  msg.fromSelf ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-4 rounded-lg max-w-[70%] shadow-sm transition-colors duration-200 ${
                    msg.fromSelf
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <b className="font-[Montserrat]">
                    {msg.fromSelf ? "You" : msg.sender}
                  </b>
                  : {msg.text}
                  <br />
                  <small className="text-xs font-[Montserrat] opacity-80">
                    {msg.time.toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              disabled={exited && !isAdmin} // Allow admin to message even if exited
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                exited && !isAdmin
                  ? "You have exited the group"
                  : "Type a message"
              }
              className="flex-1 px-6 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 font-[Montserrat] transition-colors duration-300"
            />
            <button
              onClick={sendMessage}
              disabled={(exited && !isAdmin) || !message.trim()}
              className={`rounded-lg px-8 py-3 font-bold text-white font-[Montserrat] shadow-md transition-colors duration-300 ${
                (exited && !isAdmin) || !message.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Send
            </button>
          </div>

          {exited && !isAdmin && (
            <p className="text-red-500 mt-4 font-bold font-[Montserrat] text-center">
              You have left the group chat. Refresh to rejoin if allowed.
            </p>
          )}
        </section>
      </div>

      {/* Mobile Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-80 bg-white h-full p-6 border-l border-gray-200">
            <h3 className="text-2xl font-extrabold text-green-500 mb-4 font-[Poppins] tracking-wide">
              Admin: {admin?.name || admin?.username || "Loading..."}
            </h3>
            <h3 className="text-xl font-bold text-green-500 mb-4 font-[Poppins] tracking-wide">
              Members ({members.length})
            </h3>
            <ul className="space-y-3 flex-1 overflow-y-auto">
              {members.map((m, i) => (
                <li
                  key={m._id ?? i}
                  className="py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-[Montserrat] flex justify-between items-center hover:bg-gray-200 transition-colors duration-200"
                >
                  {m.name || m.username || "Unknown"}
                  {isAdmin && m._id !== user?._id && (
                    <button
                      onClick={() => handleRemoveUser(m._id)}
                      className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isAdmin && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="mt-6 w-full py-3 rounded-lg font-bold text-white bg-green-500 hover:bg-green-600 font-[Montserrat] shadow-md transition-colors duration-300"
              >
                Add User
              </button>
            )}
            <button
              onClick={handleExitGroup}
              disabled={exited || isAdmin}
              className={`mt-3 w-full py-3 rounded-lg font-bold text-white font-[Montserrat] shadow-md transition-colors duration-300 ${
                exited || isAdmin
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Exit Group
            </button>
            <button
              onClick={() => setShowDrawer(false)}
              className="mt-3 w-full py-3 rounded-lg font-bold text-green-500 bg-white border border-green-500 hover:bg-gray-100 font-[Montserrat] shadow-md transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96 shadow-md">
            <h3 className="text-2xl font-extrabold text-green-500 font-[Poppins] mb-6">
              Add User to Group
            </h3>
            <input
              type="email"
              value={addUserEmail}
              onChange={(e) => setAddUserEmail(e.target.value)}
              placeholder="Enter user email"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 font-[Montserrat] transition-colors duration-300"
            />
            <div className="flex gap-4">
              <button
                onClick={handleAddUser}
                className="flex-1 py-3 rounded-lg font-bold text-white bg-green-500 hover:bg-green-600 font-[Montserrat] shadow-md transition-colors duration-300"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="flex-1 py-3 rounded-lg font-bold text-green-500 bg-white border border-green-500 hover:bg-gray-100 font-[Montserrat] shadow-md transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
