import { motion, AnimatePresence } from "framer-motion";
import { MdError } from "react-icons/md"; // Make sure to install react-icons

export default function Input({
  id,
  label,
  className,
  error, 
  children,
  ...props
}) {
  const hasError = Boolean(error);

  return (
    <div className="flex-col-start gap-2 w-full">
      {label && (
        <label
          className="text-[#161A41] font-bold text-sm sm:text-base cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full text-[#161A41] font-semibold rounded-lg px-4 py-2.5 sm:py-3 border-2 
        ${hasError ? "border-red-600 focus:border-red-500 bg-red-50/20" : "border-[#D9D9D9]/30 focus:border-[#6976EB]"} 
        text-sm sm:text-base outline-none transition-all
        ${className}`}
        {...props}
      />

      <AnimatePresence>
        {(typeof error === "string" && error) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex-start gap-1 text-red-600 mt-1"
          >
            <MdError className="text-sm sm:text-base" />
            <p className="text-xs sm:text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}