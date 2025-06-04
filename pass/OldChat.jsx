import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Chat() {
  const { roomId } = useParams();
  const { oneTrip, handleOneTrip } = useContext(TripContext);
  const { joinedUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const endRef = useRef(null);
  const [members, setMembers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [showSidebar, setShowSidebar] = useState(false); // NEW

  const fetchChatData = async () => {
    try {
      const membersRes = await axios.get(
        `http://localhost:4000/api/chat/${roomId}/members`
      );
      setMembers(membersRes.data.member);
    } catch (err) {
      console.error("Chat initialization error:", err);
      alert("Failed to load chat data");
    }
  };

  const initSocket = () => {
    const token = localStorage.getItem("token");

    socket.current = io("http://localhost:4000", {
      auth: { token },
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });
    console.log("Token for Socket.IO:", token);

    socket.current.on("connect", () => {
      setConnectionStatus("connected");
      console.log("✅ Connected to chat server");

      if (roomId) {
        socket.current.emit("join_room", roomId);

        setMembers((prev) => {
          const exists = prev.some((m) => m._id === joinedUser._id);
          if (!exists) {
            return [...prev, { _id: joinedUser._id, name: joinedUser.name }];
          }
          return prev;
        });
      }
    });

    socket.current.on("connect_error", (err) => {
      setConnectionStatus("disconnected");
      console.error("Connection error:", err.message);
    });

    socket.current.on("error", (err) => {
      alert(`Chat error: ${err}`);
    });

    socket.current.on("receive_message", (data) => {
      console.log("📥 Received message:", data);
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: data.senderName,
          time: new Date(data.timestamp),
          fromSelf: data.sender === joinedUser?._id,
        },
      ]);
    });

    socket.current.on("user_joined", (joinedUser) => {
      console.log("👤 User joined:", joinedUser);
      setMembers((prev) => {
        const exists = prev.some((u) => u._id === joinedUser.userId);
        if (!exists) {
          return [...prev, { _id: joinedUser.userId, name: joinedUser.name }];
        }
        return prev;
      });
    });

    return () => {
      socket.current?.disconnect();
    };
  };

  useEffect(() => {
    fetchChatData();
    const cleanup = initSocket();
    return () => cleanup?.();
  }, [roomId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    if (roomId) handleOneTrip(roomId);
  }, [messages, roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      room: roomId,
      message: message.trim(),
    };

    socket.current.emit("send_message", messageData, (ack) => {
      if (ack?.status !== "ok") {
        alert("Failed to send message");
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          text: message,
          sender: "You",
          time: new Date(),
          fromSelf: true,
        },
      ]);

      setMessage("");
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row w-full sm:max-w-4xl  text-black rounded-2xl shadow-xl h-[100vh] ">
      {/* Sidebar */}
      {(showSidebar || window.innerWidth >= 768) && (
        <div className="absolute md:static top-0 left-0 z-20 w-3/4 md:w-[30%] h-full border-r border-gray-300 bg-[#f0fbf7] p-3 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-[#0f766e]">
              Joined Users ({members.length})
            </h2>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {connectionStatus}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {members.map((user, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="truncate">
                  {user.name || user.username || "Unnamed"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Chat */}
      <div className="w-full h-[100vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-300 bg-[#e9fdf4] flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#0f766e]">
            ✈️ {oneTrip?.place || "Loading..."} Chat Room
          </h2>

          {/* 3-dot toggle for sidebar */}
          <button
            className="md:hidden text-gray-600 hover:text-black focus:outline-none text-2xl"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            &#8942;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f5fdfb] max-h-[calc(100%-100px)]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
          )}
          <div ref={endRef} />
        </div>

        <div className="flex border-t border-gray-300  sm:px-0">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none rounded-bl-2xl"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-[#0f766e] hover:bg-[#0d5e58] text-white px-5 text-sm font-semibold rounded-br-2xl transition disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const MessageBubble = ({ message }) => (
  <div className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-sm ${
        message.fromSelf
          ? "bg-[#33D69F] text-white rounded-br-none"
          : "bg-gray-200 text-gray-800 rounded-bl-none"
      }`}
    >
      {!message.fromSelf && (
        <span className="text-xs font-semibold text-gray-600">
          {message.sender}
        </span>
      )}
      <p className="whitespace-pre-wrap">{message.text}</p>
      <span
        className={`text-[10px] block mt-1 ${
          message.fromSelf ? "text-white/70" : "text-gray-500"
        } text-right`}
      >
        {message.time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  </div>
);

export default Chat;
