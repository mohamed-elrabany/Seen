import { motion } from "framer-motion";

// ================= SHIMMER =================
const Shimmer = () => {
  return (
    <motion.div
      animate={{ x: ["-100%", "100%"] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute inset-0"
      style={{
        // Adapted shimmer colors to look good on both light and deep dark backgrounds
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }}
    />
  );
};

// ================= SKELETON BOX =================
const SkeletonBox = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-[#D9D9D9]/50 dark:bg-white/5 ${className}`}>
      <Shimmer />
    </div>
  );
};

// ================= POST SKELETON =================
export const CommunityPostSkeleton = () => {
  return (
    /* Container matched to your color reference */
    <div className="w-full shadow-lg flex flex-col gap-8 border p-4 md:p-6 rounded-2xl
                    bg-white bg-none border-[#D9D9D9]/30
                    dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10">
      
      {/* ===== USER INFO ===== */}
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 items-center">
          
          {/* Avatar - using the same light blue/purple base from your ref */}
          <div className="w-12 h-12 bg-[#ADB4F3]/30 rounded-full shrink-0 relative overflow-hidden">
             <Shimmer />
          </div>

          {/* Name + Date */}
          <div>
            <SkeletonBox className="w-32 h-4 rounded mb-2" />
            <SkeletonBox className="w-24 h-3 rounded" />
          </div>
        </div>

        {/* Category Badge */}
        <SkeletonBox className="w-20 h-8 rounded-full" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="space-y-3">
        <SkeletonBox className="w-1/2 h-5 rounded" /> {/* title */}
        <div className="space-y-2">
            <SkeletonBox className="w-full h-4 rounded" />
            <SkeletonBox className="w-3/4 h-4 rounded" />
        </div>
      </div>

      {/* ===== IMAGE ===== */}
      <SkeletonBox className="w-full h-48 rounded-xl" />

      {/* ===== ACTIONS ===== */}
      <div className="w-full flex justify-between items-center pt-3 border-t border-[#D9D9D9]/50 dark:border-white/10">
        
        {/* Left actions (Likes/Comments) */}
        <div className="flex gap-4">
          <SkeletonBox className="w-12 h-6 rounded-lg" />
          <SkeletonBox className="w-12 h-6 rounded-lg" />
        </div>

        {/* Right actions (Edit/Delete - only if needed) */}
        <div className="flex gap-2">
          <SkeletonBox className="w-8 h-8 rounded-md" />
          <SkeletonBox className="w-8 h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 items-start p-4 border-b border-[#D9D9D9]/30 dark:border-white/5">
      
      {/* Avatar */}
      <div className="w-10 h-10 bg-[#ADB4F3]/30 rounded-full shrink-0 relative overflow-hidden">
         <Shimmer />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <SkeletonBox className="w-24 h-4 rounded" />
          <SkeletonBox className="w-16 h-3 rounded" />
        </div>

        <SkeletonBox className="w-full h-4 rounded" />
        <SkeletonBox className="w-3/4 h-4 rounded" />

        <div className="flex gap-4 pt-1">
          <SkeletonBox className="w-10 h-5 rounded-lg" />
          <SkeletonBox className="w-10 h-5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};