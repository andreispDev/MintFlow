import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

export default function RoleGuard({ children, allowedRoles = [] }) {
  const { profile, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!profile) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
