import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";
import Sidebar from "../components/layout/Sidebar";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

//   if (!isAuthenticated) {
//     return <Navigate to={"/login"} state={{ from: location }} replace />;
//   }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 pt-40 lg:pt-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
