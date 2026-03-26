import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-4 border-2 border-[#6976EB] hover:bg-[#6976EB] text-[#6976EB] hover:text-white shadow-lg flex-center gap-2 w-auto cursor-pointer text-lg font-bold rounded-xl transition-all"
    >
      <p className="font-bold uppercase">
        {i18n.language === "ar" ? "EN" : "AR"}
      </p>
      <MdOutlineLanguage className="w-6 h-6" />
    </button>
  );
}