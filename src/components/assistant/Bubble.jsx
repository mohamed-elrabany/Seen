import { useTranslation } from "react-i18next";
import { getBorderColor } from "../../util/community/ctaegoryColors";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkBreaks from 'remark-breaks';

export default function Bubble({ role, content, responseLoading }) {
  const { i18n } = useTranslation();
  const currentUser = useSelector((state) => state.user.user);

  const isBot = role === "assistant";

  const userBorderColor =
    getBorderColor(currentUser?.diabetes_type?.toLowerCase()) ||
    "border-gray-300";

  return (
    <div
      className={`flex items-start gap-3 w-full my-4 lg:my-8 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {/* Profile Picture / Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center overflow-hidden justify-center shrink-0 ${
          isBot
            ? "bg-[#6976EB]/10 border border-[#6976EB]/30 order-1"
            : `${userBorderColor} border-2 bg-[#ADB4F3]/60 order-2`
        }`}
      >
        {isBot ? (
          <span className="text-xs font-bold text-[#6976EB]">AI</span>
        ) : (
          <img
            src={currentUser?.profile_picture || null}
            alt="profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Message Text Block */}
      <div className={`max-w-[80%] ${isBot ? "order-2" : "order-1"}`}>
        {isBot ? (
          <div
            className="text-[#161A41] dark:text-gray-200 text-base leading-relaxed pt-1 markdown-content 
  [&>p]:mb-4
  [&>p]:last-child:mb-4 
  [&>h3]:my-4 
  [&>ol]:space-y-2 [&>ol]:mb-4 [&>ol]:pl-6
  [&>ul]:space-y-2 [&>ul]:mb-4 [&>ul]:pl-6
  [&>ol_li]:mb-2 [&>ul_li]:mb-2"
          >
            {responseLoading ? (
              <span className="flex gap-1 items-center pt-1">
                <span className="w-2 h-2 rounded-full bg-[#6976EB] animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-[#6976EB] animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-[#6976EB] animate-bounce [animation-delay:300ms]" />
              </span>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content ?? ""}</ReactMarkdown>
            )}
          </div>
        ) : (
          <div className="px-4 py-2 rounded-2xl break-words w-fit bg-[#6976EB] text-white rounded-se-none">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content ?? ""}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
