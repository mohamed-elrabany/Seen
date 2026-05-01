import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function LoadingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans
      bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] 
      dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F] transition-colors duration-500">
      
      {/* Background Animated Glows - Adjusted for both modes */}
      <motion.div
        className="pointer-events-none absolute right-[-5%] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full z-0 opacity-20 dark:opacity-40"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, #6976EB 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-[-5%] top-[30%] h-[25rem] w-[25rem] rounded-full z-0 opacity-10 dark:opacity-30"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, #1F1A5F 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center z-20 text-center px-6">
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-800 dark:text-white text-3xl font-bold tracking-tight"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {t("loadingPage.title")}
          </motion.h2>

          {/* Enhanced Progress Bar - Contrast adjusted for Light/Dark */}
          <div className="w-64 h-1.5 rounded-full overflow-hidden bg-[#D9D9D9]/30 dark:bg-white/10 relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6976EB] to-transparent"
            />
          </div>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-500 dark:text-white/40 text-sm font-medium"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {t("loadingPage.description")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}