import Header from "../layout/Header";
import Input from "../ui/Input";

import { PiChatCircleTextBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChatHeader() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Header>
      <div className="flex justify-start items-center gap-4">
        <IoChevronBack
          className={`text-white w-6 h-6 cursor-pointer ${i18n.dir() === "rtl" ? "rotate-180" : ""}`}
        />
        <div className="flex justify-start items-center gap-4">
          <div className="p-4 rounded-full bg-[#161A41]/40 flex-center ">
            <PiChatCircleTextBold className="text-white w-6 h-6" />
          </div>
          {/* Main Title Updated */}
          <h2 className="text-white mb-0">المحادثات</h2>
        </div>
      </div>

      <div className="relative mb-4">
        <IoSearch
          className={`absolute ${i18n.dir() === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-400 w-5 h-5 z-10`}
        />
        <Input
          type="text"
          value={searchTerm}
          placeholder="ابحث هنا..."
          className={`w-full ${i18n.dir() === "rtl" ? "pr-12" : "pl-12"} ps-4 py-3 border-2 rounded-lg outline-none transition-all focus:border-[#6976EB] bg-white/10 border-white/20 dark:border-white/10 dark:placeholder:text-gray-400 placeholder:text-gray-300 text-white`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </Header>
  );
}
