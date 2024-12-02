import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);

  console.log("in protected route", isAuthenticated, userRole, loading);  

  if (loading) {
    // Render a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />; // Redirect if the user does not have the required role
  }

  return children; // Render the child components if authorized
};

export default ProtectedRoute;
