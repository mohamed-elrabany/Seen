import { Link } from "react-router-dom";
import LanguageSwitcher from "../ui/LanguageSwitcherButton";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop */}
      <nav className="hidden lg:flex justify-between items-center fixed top-0 z-50 w-full bg-white px-8 py-4 shadow-md">
        <img src="/logo.svg" alt="Seen logo" className="h-10 w-auto" />

        <ul className="flex items-center gap-8 text-lightGray">
          <a
            href="#features"
            className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          >
            {t("navbar.features")}
          </a>
          <a
            href="#community"
            className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          >
            {t("navbar.community")}
          </a>
          <a
            href="#testimonials"
            className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          >
            {t("navbar.testimonials")}
          </a>
          <li>
            <Link
              to="/login"
              className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
            >
              {t("common.login")}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="bg-[#6976EB] hover:bg-[#1F1A5F] transition-all text-white rounded-full px-6 py-2.5 font-bold shadow-lg"
            >
              {t("common.signup")}
            </Link>
          </li>
        </ul>

        <LanguageSwitcher />
      </nav>

      {/* Mobile */}
      <nav className="flex lg:hidden justify-between items-center fixed top-0 z-50 w-full bg-white px-4 py-3 shadow-md">
        <img src="/logo.svg" alt="Seen logo" className="h-8 w-auto" />

        {/* Mobile Navbar */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="border-2 border-[#6976EB] bg-[#6976EB] hover:bg-[#1F1A5F] 
    hover:border-[#1F1A5F] text-white rounded-xl px-4 py-2 text-sm font-bold 
    shadow-lg transition-all"
          >
            {t("common.login")}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </>
  );
}
