import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

export default function BaseModal({ isOpen, onClose, title, icon: Icon, children }) {
  
  // Side effect to lock background body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#161A41] w-full max-w-2xl max-h-[90dvh] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 flex flex-col"
          >
            {/* Standard Header */}
            <div className="relative p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="p-2 bg-[#6976EB]/20 rounded-lg text-[#6976EB]">
                    <Icon className="w-6 h-6" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#161A41] dark:text-white mb-0">{title}</h3>
              </div>
              <button onClick={onClose} className="absolute cursor-pointer top-6 right-6 text-gray-400 hover:scale-110 transition-all">
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Injected Content Wrapper */}
            <div className="p-6 flex-1 min-h-0 overflow-y-auto no-scrollbar">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}