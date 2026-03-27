import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    // LanguageSwitcher — match the same py-2 px-4 text-sm
    <button
      onClick={toggleLanguage}
      className="border-2 border-[#6976EB] hover:bg-[#6976EB] text-[#6976EB] 
  hover:text-white shadow-lg flex-center gap-1 w-auto cursor-pointer 
  text-sm font-bold rounded-xl transition-all px-4 py-2"
    >
      <p className="font-bold uppercase">
        {i18n.language === "ar" ? "EN" : "AR"}
      </p>
      <MdOutlineLanguage className="w-4 h-4" />
    </button>
  );
}
