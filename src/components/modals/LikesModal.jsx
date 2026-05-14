import BaseModal from "../ui/BaseModal";
import { getLikes } from "../../services/communityServices";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.3 },
  },
};

export default function LikesModal({ isOpen, onClose, id, type }) {
  const [likes, setLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const scrollRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setLikes([]);
      setTotalLikes(0);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    }
  }, [isOpen, id]);

  useEffect(() => {
    if (!isOpen || !hasMore || isLoading) return;

    const fetchLikes = async () => {
      setIsLoading(true);
      try {
        const response = await getLikes(id, type, page);
        console.log("Fetched Likes Response:", response);
        const fetchedUsers = response.users || [];
        const total = response.total_likes || 0;

        setTotalLikes(total);

        if (fetchedUsers.length === 0) {
          setHasMore(false);
        } else {
          setLikes((prev) => {
            const combined = [...prev, ...fetchedUsers];
            // Ensure hasMore is updated based on the actual result
            if (combined.length >= total || fetchedUsers.length < 10) {
              setHasMore(false);
            }
            return combined;
          });
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [page, id, type, isOpen]);

  const profileBorderColorMap = {
    type1: "border-[#ef4444]",
    type2: "border-[#3b82f6]",
    mody: "border-[#f97316]",
    lada: "border-[#22c55e]",
    gestational: "border-[#a855f7]",
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} icon={FaHeart} title={t("Likes")}>
      {/* Scroll container must have explicit overflow and a min-height */}
      <div
        ref={scrollRef}
        onScroll={() => {
          if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 50 && !isLoading && hasMore) {
              setPage(p => p + 1);
            }
          }
        }}
        className="max-h-[60vh] min-h-[200px] overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2 w-full"
        >
          <p className="text-center uppercase text-gray-400 font-bold text-[10px] tracking-widest py-2">
            {totalLikes} {t("like(s)")}
          </p>

          {/* If likes has data, map it. If not and not loading, show empty state */}
          {likes.length > 0 ? (
            likes.map((user, idx) => (
              <div
                key={`${user.id}-${idx}`}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all"
              >
                <div className={`w-11 h-11 border-2 rounded-full overflow-hidden shrink-0 shadow-sm ${
                    profileBorderColorMap[user?.diabetes_type?.toLowerCase().replace(/\s/g, "")] || "border-[#6976EB]"
                  }`}>
                  <img
                    src={user?.profile_picture || user?.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                    
                  />
                </div>
                <div className="flex-1">
                  <h4 className="m-0 text-[#161A41] dark:text-white font-bold text-sm">
                    {user?.first_name} {user?.last_name}
                  </h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold m-0">
                    {user?.diabetes_type || "Member"}
                  </p>
                </div>
              </div>
            ))
          ) : !isLoading && (
            <div className="text-center py-10 text-gray-400 text-sm">
               No users found
            </div>
          )}

          {isLoading && (
            <div className="py-6 flex justify-center">
              <div className="w-6 h-6 border-2 border-t-transparent border-[#6976EB] rounded-full animate-spin" />
            </div>
          )}
        </motion.div>
      </div>
    </BaseModal>
  );
}