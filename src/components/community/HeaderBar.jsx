import Header from "../layout/Header";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added

export default function HeaderBar() {
  const { t } = useTranslation(); // Initialize

  return (
    <Header>
      <h1 className="text-white">
        {t("communityPage.header.title")}
      </h1>
      
      <p className="text-white">
        {t("communityPage.header.subtitle")}
      </p>

      <Link
        to={'/community/create'}
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