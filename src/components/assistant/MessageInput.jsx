import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import { GoImage } from "react-icons/go";
import AddImageIcon from "../ui/AddImageIcon";

export default function MessageInput({ sendMessage, isPending }) {
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();

  function handleSend() {
    const snapshot = message;
    if (!message.trim()) return;
    setMessage("");
    sendMessage(message, {
      onError: () => setMessage(snapshot),
    });
  }

  return (
    <div className="border-t sticky left-0 right-0 bottom-0 border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-[#161A41] shrink-0">
      <div className="grid grid-cols-6 items-end justify-center gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={t("chats.inputPlaceholder")}
          rows={1}
          className="w-full h-full col-span-5 bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400 border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
        />

        <button
          disabled={message.trim() === "" || isPending}
          onClick={handleSend}
          className={`w-full h-full col-span-1 p-4 flex items-center justify-center rounded-lg ${
            !message.trim() || isPending
              ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
              : "bg-[#6976EB] hover:bg-[#2B3695] text-white"
          }`}
        >
          <RiSendPlaneFill
            className={`w-4 h-4 ${
              i18n.language === "ar" ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
