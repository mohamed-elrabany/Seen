import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import LoadingPage from "../pages/loading/LoadingPage";
import Sidebar from "../components/layout/Sidebar";
import { use } from "react";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const isDarkMode = theme === "dark";
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          // Base style for all toasts
          style: {
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "16px", // Matching your section rounded-2xl feel
            padding: "16px",
            maxWidth: "400px",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(217, 217, 217, 0.3)",
            background: isDarkMode
              ? "linear-gradient(to bottom right, #1F1A5F, #161A41)"
              : "#FFFFFF",
            color: isDarkMode ? "#FAFAFF" : "#1F1A5F",
            boxShadow: isDarkMode
              ? "0 10px 30px rgba(0, 0, 0, 0.5)"
              : "0 10px 25px rgba(105, 118, 235, 0.5)",
          },
          // Specific styling for success/error icons
          success: {
            iconTheme: {
              primary: "#6976EB", // Your primary purple/blue
              secondary: "#FAFAFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#FF4B4B", // Standard error red, or adjust to your palette
              secondary: "#FAFAFF",
            },
            style: {
              // Optional: slight red tint to border for errors
              border: isDarkMode
                ? "1px solid rgba(255, 75, 75, 0.2)"
                : "1px solid rgba(255, 75, 75, 0.1)",
            },
          },
        }}
      />
      <div className="flex min-h-screen bg-gradient-to-b from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 pt-40 lg:pt-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
