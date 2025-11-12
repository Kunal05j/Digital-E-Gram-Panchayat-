import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ appUser, role, children }) {
  if (!appUser) return <Navigate to="/login" replace />;
  if (role && appUser.role !== role) return <Navigate to="/" replace />;
  return children;
}
