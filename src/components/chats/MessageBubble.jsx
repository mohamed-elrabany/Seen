import { TbChecks } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { formatDisplayedTime } from "../../util/formatDiplayedDate";
import { isProfileDefault } from "../../util/community/profileImg";
import { getBorderColor } from "../../util/community/ctaegoryColors";
import { useSelector } from "react-redux";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Static local cache object to remember receiver details across bubbles during the session
const receiverCache = {
  profile_picture: null,
  diabetes_type: null,
};

export default function MessageBubble({ cardData, message, isOwnMessage, isRead, onEdit, onDelete }) {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const [messageOptions, setMessageOptions] = useState(false);
  
  const bubbleRef = useRef(null);

  // 1. Resolve raw variables depending on who sent the message
  let rawPic = null;
  let rawDiabetesType = null;

  if (isOwnMessage) {
    rawPic = message?.sender?.profile_picture || user?.profile_picture;
    rawDiabetesType = message?.sender?.diabetes_type || user?.diabetes_type;
  } else {
    // If it's the receiver, populate our cache if the backend sent valid data
    if (message?.sender?.profile_picture) {
      receiverCache.profile_picture = message.sender.profile_picture;
    }
    if (message?.sender?.diabetes_type) {
      receiverCache.diabetes_type = message.sender.diabetes_type;
    }

    // Use current message data, or fall back to our cached receiver details
    rawPic = message?.sender?.profile_picture || receiverCache.profile_picture;
    rawDiabetesType = message?.sender?.diabetes_type || receiverCache.diabetes_type;
  }

  const profilePicture = isProfileDefault(rawPic);
  const displayTime = formatDisplayedTime(message?.created_at);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    if (!messageOptions) return;

    function handleOutsideClick(event) {
      if (bubbleRef.current && !bubbleRef.current.contains(event.target)) {
        setMessageOptions(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [messageOptions]);

  // Lag-free GPU variants
  const popoverVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.92,
      y: -4 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 450, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -2,
      transition: { duration: 0.1, ease: "easeOut" } 
    }
  };

  return (
    <div 
      ref={bubbleRef}
      onClick={() => isOwnMessage && setMessageOptions((prev) => !prev)}
      className={`flex items-start gap-2 w-full relative py-1 ${isOwnMessage ? "justify-end cursor-pointer select-none" : "justify-start"}`}
    >
      
      {/* Profile Picture */}
      <div
        className={`w-8 h-8 border-2 ${getBorderColor(rawDiabetesType?.toLowerCase())} rounded-full flex items-center overflow-hidden justify-center shrink-0 ${
          isOwnMessage ? "order-2" : "order-1"
        }`}
      >
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-xl" />
        ) : (
          <IoPerson className="w-3 h-3 text-[#808080] dark:text-gray-400" />
        )}
      </div>

      {/* Message Content & Timestamp Container */}
      <div className={`flex flex-col gap-1 max-w-[80%] relative ${isOwnMessage ? "items-end order-1" : "items-start order-2"}`}>
        
        <p
          className={`px-4 py-2 rounded-2xl break-words w-fit text-base transition-all duration-200 ${
            isOwnMessage 
              ? "bg-[#6976EB] text-white rounded-se-none" 
              : "bg-[#D7DAF3] text-[#161A41] rounded-ss-none"
          } ${messageOptions && isOwnMessage ? "opacity-40" : ""}`}
        >
          {message.message}
        </p>

        {/* Metadata */}
        <div className={`flex items-center gap-4 text-xs text-[#808080] dark:text-gray-400 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
          <p>{displayTime || "Time Missing"}</p>
          {isOwnMessage && <TbChecks className={`text-sm w-4 h-4 text-[#6976EB]`} />}
        </div>

        {/* Floating Action Menu Layered on top of the text safely */}
        <AnimatePresence>
          {(isOwnMessage && messageOptions) && (
            <motion.div 
              variants={popoverVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ willChange: "transform, opacity" }}
              className={`absolute z-30 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white dark:bg-[#1E255E] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl px-2 py-1.5 ${
                isRtl ? "left-4" : "right-4"
              }`}
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onEdit?.(message); 
                  setMessageOptions(false); 
                }} 
                className="text-xs font-medium px-2.5 py-1 text-[#6976EB] hover:bg-[#6976EB]/10 rounded-md transition-colors"
              >
                {t("edit", "Edit")}
              </button>
              
              <div className="w-[1px] h-3 bg-gray-200 dark:bg-white/10" />
              
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onDelete?.(message?.id); 
                  setMessageOptions(false); 
                }} 
                className="text-xs font-medium px-2.5 py-1 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-md transition-colors"
              >
                {t("delete", "Delete")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}