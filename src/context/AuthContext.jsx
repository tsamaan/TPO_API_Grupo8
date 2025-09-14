import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginService, registerService } from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password) => {
    const result = loginService(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setUser(result.user);
      setError("");
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setError(result.message);
    }
  };

  const register = (data) => {
    const result = registerService(data);
    if (result.success) {
      setError("");
      return true;
    } else {
      setError(result.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, error, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
