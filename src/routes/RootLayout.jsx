import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
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
      <main
        className="min-h-screen
                  bg-gradient-to-b
                  from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF]
                  dark:bg-[#0A0A0A] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]"
      >
        <Outlet />
      </main>
    </>
  );
}
