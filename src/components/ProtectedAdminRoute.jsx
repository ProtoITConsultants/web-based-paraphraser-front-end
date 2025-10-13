import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  
  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return children;
}
