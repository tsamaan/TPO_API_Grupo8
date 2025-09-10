import React, { createContext, useState } from "react";
import { loginService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const login = (email, password) => {
    const result = loginService(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setIsAuthenticated(false);
      setError(result.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};
