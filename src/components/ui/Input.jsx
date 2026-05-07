import { motion, AnimatePresence } from "framer-motion";
import { MdError } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function Input({
  id,
  label,
  className,
  error,
  errorMessage,
  children,
  ...props
}) {
  const hasError = Boolean(error);

  // twMerge will look at your default classes and the incoming 'className'
  // and automatically strip out the defaults if a replacement is provided.
  const combinedClasses = twMerge(
    `w-full text-base text-[#161A41] dark:text-white rounded-lg px-4 py-3 sm:py-4 border-2 
    ${hasError 
      ? "border-red-600 focus:border-red-500 bg-red-500/5" 
      : "border-[#808080]/30 dark:border-[#D9D9D9]/30 focus:border-[#6976EB]"
    }
    placeholder:text-[#808080] dark:placeholder:text-gray-400 
    outline-none transition-all`,
    className
  );

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {label && (
        <label
          className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={combinedClasses}
        {...props}
      />

      <AnimatePresence>
        {typeof error === "string" && error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-start gap-1 text-red-600 mt-1"
          >
            <MdError className="text-sm sm:text-base" />
            <p className="text-xs sm:text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}