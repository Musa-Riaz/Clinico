import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/doctor/BookingPage";
import UserAppointments from "./pages/UserAppointments";
import DoctorAppointments from "./pages/DoctorAppointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/applyDoctor" element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute><Doctors/></ProtectedRoute>} />
          <Route path="/doctor/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/notification" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />
          <Route path="/doctor/book-appointment/:id" element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><UserAppointments/></ProtectedRoute>} />
          <Route path="/doctor-appointments" element={<ProtectedRoute><DoctorAppointments/></ProtectedRoute>} />
          
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
