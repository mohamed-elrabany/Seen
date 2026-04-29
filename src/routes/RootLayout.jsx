import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function RootLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

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

      {isLandingPage ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
