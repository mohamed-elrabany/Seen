import BaseModal from "../ui/BaseModal";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getFriends } from "../../services/communityServices";
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

export default function FriendsModal({ isOpen, onClose }) {
  const [friends, setFriends] = useState([]);
  const [totalFriends, setTotalFriends] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const scrollRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setFriends([]);
      setTotalFriends(0);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if(!isOpen) return;
    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        const response = await getFriends(page);
        console.log("Fetch Friends Response:", response);

        const fetchedUsers = response || [];
        const total = fetchedUsers.length || 0;

        setTotalFriends(total);

        if (fetchedUsers.length === 0) {
          setHasMore(false);
        } else {
          setFriends((prev) => {
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

    fetchFriends();
  }, [page, isOpen]);


  return (
    <BaseModal isOpen={isOpen} onClose={onClose} icon={BsFillPersonCheckFill} title={t("Friends")}>
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
          className="flex flex-col gap-2 w-full p-4"
        >
          <p className="text-center uppercase text-gray-400 font-bold text-[10px] tracking-widest py-2">
            {t("modals.friends.total-friends", { count: totalFriends })} friends
          </p>

          {/* If friends has data, map it. If not and not loading, show empty state */}
          {friends.length > 0 ? (
            friends.map((user, idx) => {
                const profileBorderColor = getBorderColor(
                  user.diabetes_type?.toLowerCase(),
                );
                const profilePictureUrl = isProfileDefault(
                  user.profile_picture,
                );
                return (
                  <motion.div
                    onClick={() => navigate(`/users/${user.id}`)}
                    whileHover={{
                      boxShadow: "0px 10px 15px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.1,
                      ease: "easeOut",
                      stiffness: 0.2,
                    }}
                    key={`${user.id}-${idx}`}
                    className="cursor-pointer group flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/10"
                  >
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
                  </motion.div>
                );
              })
          ) : !isLoading && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No friends found.
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