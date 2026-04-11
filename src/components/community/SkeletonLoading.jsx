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
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
      }}
    />
  );
};

// ================= SKELETON BOX =================
const SkeletonBox = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-[#E0E0E0] ${className}`}>
      <Shimmer />
    </div>
  );
};

// ================= POST SKELETON =================
export const CommunityPostSkeleton = () => {
  return (
    <div className="w-full bg-white shadow-lg flex flex-col gap-8 border border-[#D9D9D9]/30 p-8 rounded-2xl">
      
      {/* ===== USER INFO ===== */}
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 items-center">
          
          {/* Avatar */}
          <SkeletonBox className="w-12 h-12 rounded-full" />

          {/* Name + Date */}
          <div>
            <SkeletonBox className="w-32 h-4 rounded mb-2" />
            <SkeletonBox className="w-24 h-3 rounded" />
          </div>
        </div>

        {/* Category */}
        <SkeletonBox className="w-20 h-8 rounded-full" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="space-y-2">
        <SkeletonBox className="w-1/2 h-5 rounded" /> {/* title */}
        <SkeletonBox className="w-full h-4 rounded" />
        <SkeletonBox className="w-3/4 h-4 rounded" />
      </div>

      {/* ===== IMAGE ===== */}
      <SkeletonBox className="w-full h-48 rounded-xl" />

      {/* ===== HASHTAGS ===== */}
      <div className="flex flex-wrap gap-2">
        <SkeletonBox className="w-16 h-6 rounded-full" />
        <SkeletonBox className="w-20 h-6 rounded-full" />
        <SkeletonBox className="w-14 h-6 rounded-full" />
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="w-full flex justify-between items-center pt-3 border-t border-[#D9D9D9]/50">
        
        {/* Left actions */}
        <div className="flex gap-4">
          <SkeletonBox className="w-16 h-8 rounded-lg" />
          <SkeletonBox className="w-16 h-8 rounded-lg" />
        </div>

        {/* Right actions */}
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
    <div className="flex gap-4 items-start p-4 border-b border-[#D9D9D9]/30">
      
      {/* Avatar */}
      <SkeletonBox className="w-10 h-10 rounded-full" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        {/* Name + Date */}
        <div className="flex justify-between items-center">
          <SkeletonBox className="w-24 h-4 rounded" /> {/* name */}
          <SkeletonBox className="w-16 h-3 rounded" /> {/* date */}
        </div>

        {/* Comment text */}
        <SkeletonBox className="w-full h-4 rounded" />
        <SkeletonBox className="w-3/4 h-4 rounded" />

        {/* Actions (like/reply) */}
        <div className="flex gap-4 pt-1">
          <SkeletonBox className="w-12 h-6 rounded-lg" />
          <SkeletonBox className="w-12 h-6 rounded-lg" />
        </div>
      </div>
    </div>
  );
};