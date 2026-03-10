import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#6976EB] animate-spin"></div>
    </div>
    // <div
    //   className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF]">
    //   <div className="max-w-md w-full text-center">

    //     {/* Loading Text */}
    //     <motion.p
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ delay: 0.3 }}
    //       className="text-lg mb-8 text-[#808080]"
    //       style={{ fontFamily: "Cairo, sans-serif" }}
    //     >
    //       جاري تحميل البيانات...
    //     </motion.p>

    //     {/* Loading Dots Animation */}
    //     <div className="flex justify-center gap-2 mb-8">
    //       {[0, 1, 2].map((index) => (
    //         <motion.div
    //           key={index}
    //           animate={{
    //             y: [0, -15, 0],
    //             scale: [1, 1.2, 1],
    //           }}
    //           transition={{
    //             duration: 0.8,
    //             repeat: Infinity,
    //             delay: index * 0.15,
    //             ease: "easeInOut",
    //           }}
    //           className="w-3 h-3 bg-gradient-to-br from-[#6976EB] to-[#2B3695] rounded-full"
    //         />
    //       ))}
    //     </div>

    //     {/* Progress Bar */}
    //     <div className="h-2 rounded-full overflow-hidden bg-[#D9D9D9]/30">
    //       <motion.div
    //         initial={{ width: "0%" }}
    //         animate={{ width: "100%" }}
    //         transition={{
    //           duration: 2,
    //           repeat: Infinity,
    //           ease: "easeInOut",
    //         }}
    //         className="h-full bg-gradient-to-r from-[#6976EB] to-[#2B3695] rounded-full"
    //       />
    //     </div>

    //     {/* Status Text */}
    //     <motion.p
    //       animate={{ opacity: [0.5, 1, 0.5] }}
    //       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    //       className="text-sm mt-6 text-[#ADADAD]"
    //       style={{ fontFamily: "Cairo, sans-serif" }}
    //     >
    //       يرجى الانتظار قليلاً
    //     </motion.p>
    //   </div>
    // </div>
  );
}