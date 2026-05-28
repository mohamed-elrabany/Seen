import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "../../util/formatRelativeTime";
import { useSelector } from "react-redux";

export default function ConversationCard({ cardData }) {
  let isRead = cardData?.latest_message?.is_read || false;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const otherUser =
    cardData?.user1?.id === user.id ? cardData?.user2 : cardData?.user1;

  const profileBorderColorMap = {
    type1: "border-2 border-[#ef4444]",
    type2: "border-2 border-[#3b82f6]",
    mody: "border-2 border-[#f97316]",
    lada: "border-2 border-[#22c55e]",
    gestational: "border-2 border-[#a855f7]",
  };

  const profileBorderColor =
    profileBorderColorMap[otherUser?.diabetes_type?.toLowerCase()] ??
    "border-2 border-gray-300";

  return (
    <motion.div
      whileHover={{ boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        stiffness: 0.2,
      }}
      className={`grid grid-cols-5 items-center gap-2 p-4 rounded-lg shadow-lg cursor-pointer
        bg-white dark:bg-white/10 border transition-colors duration-300
        ${isRead ? "border-[#D9D9D9]/30 dark:border-white/10" : "border-[#6976EB]"}
        `}
      onClick={() => navigate(`/chats/${otherUser.id}`)}
    >
      <div className="col-span-4 flex justify-start items-center gap-4 min-w-0">
        {" "}
        {/* Added min-w-0 here */}
        <div
          className={`w-12 h-12 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}
        >
          <img
            src={
              otherUser?.profile_picture || "https://i.pravatar.cc/150?img=7"
            }
            alt="profile_picture"
          />
        </div>
        <div className="w-full col-span-3 flex flex-col min-w-0">
          {" "}
          {/* Added min-w-0 here */}
          <h3 className="font-bold text-[#161A41] dark:text-white mb-0 text-lg truncate">
            {" "}
            {/* Added truncate */}
            {otherUser?.first_name || "User"} {otherUser?.last_name || "Name"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 truncate">
            {" "}
            {/* Added truncate */}
            {cardData?.latest_message.message ||
              "ولا يهمك، خلي بالك من نفسك وقولي الرقم نزل ولا لأ 👍"}
          </p>
        </div>
      </div>

      <div className="col-span-1 w-full flex flex-col justify-end items-center gap-2">
        <p
          className={`text-sm ${isRead ? "text-[808080] dark:text-gray-400" : "text-[#6976EB]"} `}
        >
          {cardData?.last_updated
            ? formatRelativeTime(cardData.last_updated)
            : "12:00 م"}
        </p>
        <div
          className={`w-3 h-3 rounded-full bg-[#6976EB] ${isRead ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    </motion.div>
  );
}
