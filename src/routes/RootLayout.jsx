import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function RootLayout() {
  const location = useLocation();
  const { pathname } = location;

  const isLandingPage = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAppPage = !isLandingPage && !isAuthPage; // /home and future pages

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#FFFFFF",
            color: "#6976EB",
            borderRadius: "10px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          },
        }}
      />

      {/* LANDING PAGE — Navbar + full width, no extra padding */}
      {isLandingPage && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      )}

      {isAuthPage && <Outlet />}

    </>
  );
}
