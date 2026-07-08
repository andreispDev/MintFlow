import { useAuth } from "../context/AuthContext";

export default function useRole() {
  const { profile } = useAuth();

  return {
    role: profile?.role,

    isAdmin: profile?.role === "admin",

    isManager: profile?.role === "manager",

    isEmployee: profile?.role === "employee",
  };
}
