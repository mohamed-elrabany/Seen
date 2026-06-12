import { useTranslation } from "react-i18next";
import { getBorderColor } from "../../util/community/ctaegoryColors";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export default function Bubble({ role, content, responseLoading }) {
  const { i18n } = useTranslation();
  const currentUser = useSelector((state) => state.user.user);

  const isBot = role === "assistant";

  const userBorderColor =
    getBorderColor(currentUser?.diabetes_type?.toLowerCase()) ||
    "border-gray-300";

  function fixMarkdown(text) {
    const boldCount = (text.match(/\*\*/g) || []).length;

    if (boldCount % 2 !== 0) {
      text += "**";
    }

    return text;
  }

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
      <div
        className={` ${isBot ? "order-2 max-w-[90%]" : "order-1 max-w-[80%]"}`}
      >
        {isBot ? (
          <div
            className="
    markdown-content w-full
    text-[#161A41] dark:text-gray-200
    text-base leading-7 break-words

    /* Paragraphs */
    [&_p]:mb-4
    [&_p:last-child]:mb-0

    /* Headings */
    [&_h1]:text-3xl
    [&_h1]:font-bold
    [&_h1]:mt-8
    [&_h1]:mb-4

    [&_h2]:text-2xl
    [&_h2]:font-bold
    [&_h2]:mt-6
    [&_h2]:mb-3

    [&_h3]:text-xl
    [&_h3]:font-semibold
    [&_h3]:mt-5
    [&_h3]:mb-3

    [&_h4]:text-lg
    [&_h4]:font-semibold
    [&_h4]:mt-4
    [&_h4]:mb-2

    /* Lists */
    [&_ul]:list-disc
    [&_ul]:pl-6
    [&_ul]:mb-4

    [&_ol]:list-decimal
    [&_ol]:pl-6
    [&_ol]:mb-4

    [&_li]:mb-2

    /* Nested lists */
    [&_ul_ul]:mt-2
    [&_ul_ul]:mb-2
    [&_ol_ol]:mt-2
    [&_ol_ol]:mb-2
    [&_ul_ol]:mt-2
    [&_ol_ul]:mt-2

    /* Links */
    [&_a]:text-blue-600
    dark:[&_a]:text-blue-400
    [&_a]:underline
    [&_a:hover]:opacity-80

    /* Bold & Italic */
    [&_strong]:font-bold
    [&_em]:italic

    /* Inline code */
    [&_code]:bg-gray-100
    dark:[&_code]:bg-gray-800
    [&_code]:rounded
    [&_code]:px-1
    [&_code]:py-0.5
    [&_code]:font-mono
    [&_code]:text-sm

    /* Code blocks */
    [&_pre]:bg-gray-100
    dark:[&_pre]:bg-gray-900
    [&_pre]:rounded-lg
    [&_pre]:p-4
    [&_pre]:overflow-x-auto
    [&_pre]:mb-4

    [&_pre_code]:bg-transparent
    [&_pre_code]:p-0

    /* Blockquotes */
    [&_blockquote]:border-l-4
    [&_blockquote]:border-gray-300
    dark:[&_blockquote]:border-gray-600
    [&_blockquote]:pl-4
    [&_blockquote]:italic
    [&_blockquote]:my-4

    /* Horizontal rule */
    [&_hr]:my-6
    [&_hr]:border-gray-300
    dark:[&_hr]:border-gray-700

    /* Tables */
    [&_table]:w-full
    [&_table]:overflow-x-auto
    [&_table]:border-collapse
    [&_table]:my-4

    [&_th]:border
    [&_th]:border-gray-300
    dark:[&_th]:border-gray-700
    [&_th]:px-3
    [&_th]:py-2
    [&_th]:font-semibold
    [&_th]:text-left

    [&_td]:border
    [&_td]:border-gray-300
    dark:[&_td]:border-gray-700
    [&_td]:px-3
    [&_td]:py-2

    /* Images */
    [&_img]:rounded-lg
    [&_img]:max-w-full
    [&_img]:h-auto
    [&_img]:my-4
  "
          >
            {responseLoading ? (
              <span className="flex gap-1 items-center pt-1">
                <span className="w-2 h-2 rounded-full bg-[#6976EB] animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-[#6976EB] animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-[#6976EB] animate-bounce [animation-delay:300ms]" />
              </span>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
                {fixMarkdown(content ?? "")}
              </ReactMarkdown>
            )}
          </div>
        ) : (
          <div className="px-4 py-2 rounded-2xl break-words w-fit bg-[#6976EB] text-white rounded-se-none">
            <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
              {fixMarkdown(content ?? "")}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
