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

      {isAppPage && (
        <div className="flex min-h-screen bg-gradient-to-b from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]">
          <Sidebar />
          <main className="flex-1 p-8 pt-40 lg:pt-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
