import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";

import Dashboard from "./pages/Dashboard";

import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Employee from "./pages/Employee";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin"]}>
              <Admin />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin", "manager"]}>
              <Manager />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin", "manager"]}>
              <Projects />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route

path="/reports"

element={

<ProtectedRoute>

<RoleGuard allowedRoles={[
"admin",
"manager"
]}>

<Reports/>

</RoleGuard>

</ProtectedRoute>

}

/>
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin", "manager", "employee"]}>
              <Employee />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin"]}>
              <Users />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
