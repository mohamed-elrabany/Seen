import { Link } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcherButton";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex justify-between items-center fixed top-0 z-50 w-full bg-white p-8 shadow-md">
        <img src="/logo.svg" alt="Seen logo" className="h-12 w-auto" />

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
              className="bg-[#6976EB] hover:bg-[#1F1A5F] transition-all text-white rounded-full px-6 py-3 cursor-pointer font-bold shadow-lg"
            >
              {t("common.signup")}
            </Link>
          </li>
        </ul>

        <LanguageSwitcher />
      </nav>

      {/* Mobile Navbar */}
      <nav className="flex lg:hidden justify-between items-center fixed top-0 z-50 w-full bg-white p-8 shadow-md">
        <img src="/logo.svg" alt="Seen logo" className="h-12 w-auto" />

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="w-auto h-full border-2 border-[#6976EB] bg-[#6976EB] hover:bg-[#1F1A5F] hover:border-[#1F1A5F] text-white rounded-xl p-4 cursor-pointer text-lg font-bold shadow-lg transition-all"
          >
            {t("common.login")}
          </Link>

          <LanguageSwitcher />
        </div>
      </nav>
    </>
  );
}