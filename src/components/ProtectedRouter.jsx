import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRouter({ children }) {
  const { loading, user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (loading) {
    return <div className="text-center mt-20">Loading user data...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRouter;
