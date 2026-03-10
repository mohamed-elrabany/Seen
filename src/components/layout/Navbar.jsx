import { Link } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcherButton";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="flex-between fixed top-0 z-50 w-full bg-white p-8 shadow-md">
      <img src="/logo.svg" alt="Seen logo" className="h-12 w-auto" />

      <ul className="flex-center gap-8 text-lightGray">
        <a
          className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          href="#features"
        >
          {t("features")}
        </a>
        <a
          className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          href="#community"
        >
          {t("community")}
        </a>
        <a
          className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          href="#testimonials"
        >
          {t("testimonials")}
        </a>
        <li>
          <Link
            to="/login"
            className="text-lightGray hover:text-[#6976EB] transition-all font-medium"
          >
            {t("login")}
          </Link>
        </li>

        <li>
          <Link
            to="/signup"
            className="bg-[#6976EB] hover:bg-[#1F1A5F] transition-all text-white rounded-full px-6 py-3 cursor-pointer font-bold shadow-lg"
          >
            {t("signup")}
          </Link>
        </li>
      </ul>
      <LanguageSwitcher />
    </nav>
  );
}
