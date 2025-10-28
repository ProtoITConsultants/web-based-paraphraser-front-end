import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import BlogEditor from "../pages/admin/BlogEditor";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";

export default function AdminRoutes({ darkMode, setDarkMode, user }) {
  return (
    <ProtectedAdminRoute>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/new" element={<BlogEditor />} />
        <Route path="/admin/:id" element={<BlogEditor />} />
      </Routes>
    </ProtectedAdminRoute>
  );
}
