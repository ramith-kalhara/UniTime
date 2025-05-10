// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!userData) {
    return <Navigate to="/register" replace />;
  }

  // Logged in but not authorized
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/register" replace />;
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
