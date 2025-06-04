import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import { TripProvider } from "./context/TripContext";
import { UsersDetailsProvider } from "./context/UserContext";
import { JoinTripProvider } from "./context/JoinTripContext";
import ProtectedRouter from "./components/ProtectedRouter";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword ";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <UsersDetailsProvider>
        <TripProvider>
          <JoinTripProvider>
            <Routes>
              <Route path="/admin/fayis" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRouter>
                    <Profile />
                  </ProtectedRouter>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/chat/:roomId" element={<Chat />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </JoinTripProvider>
        </TripProvider>
      </UsersDetailsProvider>
    </BrowserRouter>
  );
}

export default App;
