import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../pages/loading/LoadingPage";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) return <LoadingPage />;

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}