import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Use named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Store the user's role
  const [userEmail, setUserEmail] = useState(null); // Store the user's data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Store authentication state
  const [phone, setPhone] = useState(null);

  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        setUserEmail(decoded.email); // Replace with your token's structure
        setUserRole(decoded.role); // Replace with your token's structure
        setPhone(decoded.phone);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
        setUserEmail(null);
        setUserRole(null);
        setPhone(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserEmail(null);
      setUserRole(null);
      setPhone(null);
    }
  }, [jwtToken]); // Run once on mount

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        userRole,
        isAuthenticated,
        phone,
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
