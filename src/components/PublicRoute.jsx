import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();

  console.log("PublicRoute state:", {
    isAuthenticated: !!currentUser,
    loading,
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return currentUser ? <Navigate to="/dashboard" replace /> : children;
}
