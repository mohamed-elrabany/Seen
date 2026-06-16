import { TbChecks } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { formatDisplayedTime } from "../../util/formatDiplayedDate";
import { isProfileDefault } from "../../util/community/profileImg";
import { getBorderColor } from "../../util/community/ctaegoryColors";

export default function MessageBubble({ cardData, message, isOwnMessage, isRead }) {
  const { t, i18n } = useTranslation();
  console.log("💬 Rendering MessageBubble:", {
    cardData,
    message,
    isOwnMessage,
    isRead
  });

  const profilePicture = isProfileDefault(message?.sender?.profile_picture);
  const displayTime = formatDisplayedTime(message?.created_at);

  return (
    <div className={`flex items-start gap-2 w-full ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      
      {/* Profile Picture: Positioned dynamically via flex order. Received messages show avatar first. */}
      <div
        className={`w-8 h-8 border-2 ${getBorderColor(message?.sender?.diabetes_type)} rounded-full flex items-center overflow-hidden justify-center shrink-0 ${
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
      <div className={`flex flex-col gap-1 max-w-[80%] ${isOwnMessage ? "items-end order-1" : "items-start order-2"}`}>
        
        <p
          className={`px-4 py-2 rounded-2xl break-words w-fit ${
            isOwnMessage 
              ? "bg-[#6976EB] text-white rounded-se-none" 
              : "bg-[#D7DAF3] text-[#161A41] rounded-ss-none"
          }`}
        >
          {message.message}
        </p>

        {/* 3. Metadata (Time & Status checkmarks):
          - Uses a standard row layout. The checkmark sits naturally next to the time based on reading direction.
        */}
        <div className={`flex items-center gap-4 text-xs text-[#808080] dark:text-gray-400 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
          <p>{displayTime}</p>
          <TbChecks className={`text-sm w-4 h-4 ${isRead ? "text-[#6976EB]" : "text-[#808080] dark:text-gray-400"}`} />

        </div>
      </div>
    </div>
  );
}