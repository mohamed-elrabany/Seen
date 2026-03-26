import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function RootLayout() {
  const location = useLocation();

  // Determine if we are on the landing page
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

<div
  className={`min-h-screen ${
    !isLandingPage ? "flex md:flex-row flex-col" : "flex flex-col"
  }`}
>
  {!isLandingPage && <Sidebar />}
  {isLandingPage && <Navbar />}
  <main
    className={`w-full p-8 ${
      isLandingPage ? "pt-40" : "pt-40 lg:pt-8"
    } bg-gradient-to-b
        from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF]
        dark:bg-[#0A0A0A] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]`}
  >
    <Outlet />
  </main>
</div>
    </>
  );
}