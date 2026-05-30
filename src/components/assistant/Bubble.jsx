import { useTranslation } from "react-i18next";

export default function Bubble({ cardData, message }) {
  const { t, i18n } = useTranslation();

  const isBot = message.sender === "bot" || message.isBot;

  const profileBorderColorMap = {
    type1: "border-2 border-[#ef4444]",
    type2: "border-2 border-[#3b82f6]",
    mody: "border-2 border-[#f97316]",
    lada: "border-2 border-[#22c55e]",
    gestational: "border-2 border-[#a855f7]",
  };

  const userBorderColor =
    profileBorderColorMap[cardData?.user?.diabetes_type?.toLowerCase()] ??
    "border-2 border-gray-300";

  return (
    <div className={`flex items-start gap-3 w-full ${isBot ? "justify-start" : "justify-end"}`}>
      
      {/* Profile Picture / Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center overflow-hidden justify-center shrink-0 ${
          isBot 
            ? "bg-[#6976EB]/10 border border-[#6976EB]/30 order-1" 
            : `${userBorderColor} bg-[#ADB4F3]/60 order-2`
        }`}
      >
        {isBot ? (
          <span className="text-xs font-bold text-[#6976EB]">AI</span>
        ) : (
          <img 
            src={cardData?.user?.profile_picture || cardData?.user1?.profile_picture} 
            alt="profile" 
            className="w-full h-full object-cover" 
          />
        )}
      </div>

      {/* Message Text Block */}
      <div className={`max-w-[80%] ${isBot ? "order-2" : "order-1"}`}>
        {isBot ? (
          // Plain text layout for the chatbot assistant
          <div className="text-[#161A41] dark:text-gray-200 text-base leading-relaxed pt-1 whitespace-pre-line">
            {message.message}
          </div>
        ) : (
          // Styled message bubble specifically for the user
          <p className="px-4 py-2 rounded-2xl break-words w-fit bg-[#6976EB] text-white rounded-se-none">
            {message.message}
          </p>
        )}
      </div>

    </div>
  );
}