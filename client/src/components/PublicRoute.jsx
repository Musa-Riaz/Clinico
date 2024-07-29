import React from "react";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return children;
  else return <Navigate to="/" />;
};

export default PublicRoute;
