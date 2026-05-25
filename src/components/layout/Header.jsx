import { motion } from "framer-motion";

export default function Header({ children, className }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${className} shadow-lg rounded-2xl p-6 space-y-6 lg:p-8 bg-gradient-to-b 
      from-[#6976EB] via-[#5A67D8] to-[#2B3695]
      dark:from-[#2B3695] dark:via-[#1F1A5F] dark:to-[#161A41]
      `}
    >
      {children}
    </motion.header>
  );
}
