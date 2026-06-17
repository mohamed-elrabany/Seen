import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../pages/loading/LoadingPage";
import { useEffect } from "react";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) return <LoadingPage />;

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]">
      <Outlet />
    </div>
  );
}