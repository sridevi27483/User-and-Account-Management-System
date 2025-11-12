import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  // If not logged in → redirect to /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Else show the protected page
  return children;
}
