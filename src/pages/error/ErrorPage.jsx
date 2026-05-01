import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { IoIosArrowRoundBack } from "react-icons/io";

import errorImg from "../../assets/errorPage.svg";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden
    bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]">
      
      {/* Background Animated Glows (Inspired by your example) */}
      <motion.div
        className="pointer-events-none absolute right-[-5%] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full z-0 opacity-40"
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
        className="pointer-events-none absolute left-[-5%] top-[30%] h-[25rem] w-[25rem] rounded-full z-0 opacity-30"
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
      <div className="flex flex-col items-center justify-center gap-6 px-6 z-20 text-center">
        
        {/* Fix: Small image handling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <img 
            src={errorImg}  
            alt="Error Illustration"
            // We set a clean fixed size for the 128px asset
            className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(105,118,235,0.5)]" 
          />
        </motion.div>

        <div className="space-y-1 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6976EB] font-black text-8xl md:text-9xl tracking-tighter"
          >
            404       
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#808080] text-center dark:text-white/60 font-medium text-lg max-w-sm"
          >
            {t("errorPage.message")}
          </motion.p>
        </div>

        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 25px rgba(105,118,235,0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 hover:gap-4 mt-4 cursor-pointer rounded-xl bg-[#6976EB] text-white font-bold px-10 py-4 text-lg transition-all duration-300"
        >
          <IoIosArrowRoundBack className={`w-5 h-5 md:w-7 md:h-7 ${isRTL && "rotate-180"}`} />
          <p>{t("errorPage.button")}</p>
          
        </motion.button>
      </div>
    </div>
  );
}