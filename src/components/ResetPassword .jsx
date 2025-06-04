// Example of ResetPassword component handling the token
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token when component mounts (optional)
  }, [token]);

  const handleResetPassword = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/reset-password/${token}`,
        { password }
      );
      setMsg(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after successful reset
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="reset-password-form">
      <h2>Reset Your Password</h2>
      {msg && <p>{msg}</p>}
      {error && <p>{error}</p>}
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
