import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";

import { BsPersonFillSlash } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getBlockedUsers, unblockUser } from "../../services/communityServices";
import { getBorderColor } from "../../util/community/ctaegoryColors";
import { isProfileDefault } from "../../util/community/profileImg";

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
    if (!isOpen) return;
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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      icon={BsPersonFillSlash}
      title={"Blocked Users"}
    >
      {/* Scroll container must have explicit overflow and a min-height */}
      <div
        ref={scrollRef}
        onScroll={() => {
          if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (
              scrollHeight - scrollTop <= clientHeight + 50 &&
              !isLoading &&
              hasMore
            ) {
              setPage((p) => p + 1);
            }
          }
        }}
        className="max-h-[60vh] min-h-[200px] overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2 w-full p-4"
        >
          <p className="text-center uppercase text-gray-400 font-bold text-[10px] tracking-widest py-2">
            {t("modals.blocked-users.total-blocked", { count: totalBlocked })}
          </p>

          {/* If blocked users has data, map it. If not and not loading, show empty state */}
          {blockedUsers.length > 0
            ? blockedUsers.map((user, idx) => {
                const profileBorderColor = getBorderColor(
                  user.diabetes_type?.toLowerCase(),
                );
                const profilePictureUrl = isProfileDefault(
                  user.profile_picture,
                );
                return (
                  <motion.div
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                      stiffness: 0.2,
                      delay: idx * 0.1,
                    }}
                    key={`${user.id}-${idx}`}
                    className="flex items-center justify-between gap-4 p-4 transition-all border-b border-[#D9D9D9]/30  dark:border-white/10 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                      className={`w-12 h-12 border-2 ${profileBorderColor} rounded-full flex items-center overflow-hidden justify-center shrink-0`}
                    >
                      {profilePictureUrl ? (
                        <img
                          src={profilePictureUrl}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <IoPerson className="w-4 h-4 text-[#808080] dark:text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="mb-0 text-[#161A41] dark:text-white font-bold">
                        {user.first_name} {user.last_name}
                      </h4>
                      <p className="text-xs text-[#808080] dark:text-gray-400 uppercase">
                        {user.diabetes_type || "Member"}
                      </p>
                    </div>
                    </div>
                    
                    <Button
                      onClick={() => handleUnblock(user.id)}
                      className="px-6 py-3 flex justify-start items-center gap-2 cursor-pointer text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 rounded-xl active:scale-[0.98] transition-all duration-500 ease-out"
                    >
                      <p>Unblock</p>
                    </Button>
                  </motion.div>
                );
              })
            : !isLoading && (
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
