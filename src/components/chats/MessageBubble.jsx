import { TbChecks } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { formatDisplayedTime } from "../../util/formatDiplayedDate";

export default function MessageBubble({ cardData, message, isOwnMessage, isRead }) {
  const { t, i18n } = useTranslation();

  const profileBorderColorMap = {
    type1: "border-2 border-[#ef4444]",
    type2: "border-2 border-[#3b82f6]",
    mody: "border-2 border-[#f97316]",
    lada: "border-2 border-[#22c55e]",
    gestational: "border-2 border-[#a855f7]",
  };

  const profileBorderColor =
    profileBorderColorMap[cardData?.user?.diabetes_type?.toLowerCase()] ??
    "border-2 border-gray-300";

  return (
    <div className={`flex items-start gap-2 w-full ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      
      {/* Profile Picture: Positioned dynamically via flex order. Received messages show avatar first. */}
      <div
        className={`w-8 h-8 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0 ${
          isOwnMessage ? "order-2" : "order-1"
        }`}
      >
        <img src={cardData?.user1?.profile_picture} alt="profile_picture" className="w-full h-full object-cover" />
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
          <p>{formatDisplayedTime(message.created_at)}</p>
          <TbChecks className={`text-sm w-4 h-4 ${isRead ? "text-[#6976EB]" : "text-[#808080] dark:text-gray-400"}`} />

        </div>
      </div>
    </div>
  );
}