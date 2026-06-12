import BaseModal from "../ui/BaseModal";
import { getBlockedUsers, unblockUser } from "../../services/communityServices";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsPersonFillSlash } from "react-icons/bs";
import { getBorderColor } from "../../util/community/ctaegoryColors";
import Button from "../ui/Button";

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

export default function BlockedUsersModal({ isOpen, onClose }) {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [totalBlocked, setTotalBlocked] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const scrollRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setBlockedUsers([]);
      setTotalBlocked(0);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if(!isOpen) return;
    const fetchBlockedUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getBlockedUsers(page);
        console.log("Fetch Blocked Users Response:", response);

        const fetchedUsers = response.blocked_users || [];
        const total = fetchedUsers.length || 0;

        setTotalBlocked(total);

        if (fetchedUsers.length === 0) {
          setHasMore(false);
        } else {
          setBlockedUsers((prev) => {
            const combined = [...prev, ...fetchedUsers];
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

    fetchBlockedUsers();
  }, [page, isOpen]);

  async function handleUnblock(userId) {
    try {
      await unblockUser(userId);
      // Remove the user from the blocked users list
      setBlockedUsers((prev) => prev.filter((user) => user.id !== userId));
      setTotalBlocked((prev) => prev - 1);
      toast.success("User unblocked successfully.");
    } catch (error) {
      console.error("Unblock Error:", error);
      toast.error("Failed to unblock user.");
    }
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} icon={BsPersonFillSlash} title={"Blocked Users"}>
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
            {t("modals.blocked-users.total-blocked", { count: totalBlocked })}
          </p>

          {/* If blocked users has data, map it. If not and not loading, show empty state */}
          {blockedUsers.length > 0 ? (
            blockedUsers.map((user, idx) => (
              <div
                key={`${user.id}-${idx}`}
                className="flex items-center justify-between gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all"
              >
                <div className={`w-11 h-11 border-2 rounded-full overflow-hidden shrink-0 shadow-sm ${
                    getBorderColor(user?.diabetes_type?.toLowerCase().replace(/\s/g, "")) || "border-[#6976EB]"
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
                  <Button
                    onClick={() => handleUnblock(user.id)}
                    className=" cursor-pointer px-4 py-2 text-sm font-bold bg-[#6976EB]/20 border border-[#6976EB] text-white hover:bg-[#6976EB] transition-colors"
                  >
                    unblock
                  </Button>
              </div>
            ))
          ) : !isLoading && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No blocked users found.
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