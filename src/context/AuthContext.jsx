import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Use named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Store the user's role
  const [userEmail, setUserEmail] = useState(null); // Store the user's data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Store authentication state
  const [phone, setPhone] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, isLoading] = useState(true);

  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        setUserEmail(decoded.email); // Replace with your token's structure
        setUserRole(decoded.role); // Replace with your token's structure
        setPhone(decoded.phone);
        setUserId(decoded.id);
        setIsAuthenticated(true);
        console.log("if block");
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
        setUserEmail(null);
        setUserRole(null);
        setPhone(null);
      }
    }
    isLoading(false);
  }, [jwtToken]); // Run once on mount

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        userRole,
        isAuthenticated,
        phone,
        userId,
        loading,
        setJwtToken,
        setUserEmail,
        setUserRole,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
