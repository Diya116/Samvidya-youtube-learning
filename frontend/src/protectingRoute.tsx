import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  console.log("ProtectedRoute isAuthenticated:", isAuthenticated());

  if (!isAuthenticated()) {
    console.log("User is not authenticated, redirecting to login");
      <Navigate to="/auth/login" replace />;
  }

  return children;
};
