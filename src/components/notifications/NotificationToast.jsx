import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function NotificationToast({ t, notification }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDarkMode = theme === "dark";

  // Dynamic style layout matching your Toaster configuration exactly
  const toastStyle = {
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "16px", // Matching your section rounded-2xl look
    padding: "16px",
    maxWidth: "400px",
    width: "100%",
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      style={toastStyle}
      className={`${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      dir="rtl"
    >
      <div className="flex-1 w-0">
        <div className="flex items-start">
          {/* Avatar Area */}
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-[#6976EB]"
              src={notification.extra_data?.avatar_url || "https://via.placeholder.com/150"}
              alt=""
            />
          </div>

          {/* Text Content Area */}
          <div className="mr-3 flex-1 text-right">
            <p className="text-sm font-bold">
              {notification.title || "إشعار جديد 🎯"}
            </p>
            <p
              className="mt-1 text-sm font-normal"
              style={{ color: isDarkMode ? "#DCDFFF" : "#6976EB" }}
            >
              {notification.message}
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Action Divider / Button */}
      <div 
        className="flex border-r"
        style={{ borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(217, 217, 217, 0.3)" }}
      >
        <button
          onClick={() => {
            toast.dismiss(t.id);
            console.log("clicked");
          }}
          className="w-full cursor-pointer border border-transparent rounded-none rounded-l-lg px-4 flex items-center justify-center text-sm font-bold hover:opacity-80 focus:outline-none transition-opacity"
          style={{ color: isDarkMode ? "#FAFAFF" : "#6976EB" }}
        >
          إغلاق
        </button>
      </div>
    </motion.div>
  );
}