import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <Loader label="Checking your session" />;

  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return children;
}
