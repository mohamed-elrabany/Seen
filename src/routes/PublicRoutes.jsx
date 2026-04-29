import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/ui/Loading";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) return <Loading />;

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}