import Header from "../layout/Header";
import { IoAddCircle, IoSearch, IoChatbubbleOutline } from "react-icons/io5";
import { PiChatCircleTextBold } from "react-icons/pi";


import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added


export default function HeaderBar() {
  const { t } = useTranslation(); // Initialize
  const navigate = useNavigate();

  return (
    <Header>
      <div className="w-full flex justify-between items-start">
        <div className="w-full">
          <h1 className="text-white">{t("communityPage.header.title")}</h1>
          <p className="text-white">{t("communityPage.header.subtitle")}</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <IoSearch onClick={()=> navigate('/community/search')} className="w-6 h-6 text-white cursor-pointer" />
          <div className="relative group cursor-pointer">
            <PiChatCircleTextBold onClick={()=> navigate('/chats')} className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-[#FB2C36] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
          </div>
        </div>
        <div>

        </div>
      </div>

      <Link
        to={"/community/create"}
        className="bg-white flex-between p-4 rounded-lg text-[#6976EB] hover:shadow-md hover:scale-[1.01] transition-all duration-200"
      >
        <p className="text-[#6976EB] font-semibold">
          {t("communityPage.header.placeholder")}
        </p>
        <IoAddCircle className="w-10 h-10" />
      </Link>
    </Header>
  );
}
