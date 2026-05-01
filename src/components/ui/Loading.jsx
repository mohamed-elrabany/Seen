import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#6976EB] animate-spin"></div>
    </div>
  );
}