import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/authProvider";

export const ProtectedRoute = () => {
  const { token }:any = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};