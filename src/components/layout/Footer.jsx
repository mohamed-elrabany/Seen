import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#161A41] w-full px-6 lg:px-12 py-12 flex-col-center">
      <div className="w-full grid md:grid-cols-4 gap-12 mb-8">
        
        {/* Logo + description */}
        <div className="flex-col-start gap-4">
          <img src="/logo.svg" alt="Seen logo" className="h-12 w-auto" />
          <p className="text-white/70">
            {t("footer.description")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-col-start gap-4">
          <h4 className="font-bold text-white">
            {t("footer.quickLinks.title")}
          </h4>

          <ul className="space-y-2">
            <li>
              <a
                href="#features"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.quickLinks.features")}
              </a>
            </li>

            <li>
              <a
                href="#community"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.quickLinks.community")}
              </a>
            </li>

            <li>
              <a
                href="#donate"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.quickLinks.donations")}
              </a>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="flex-col-start gap-4">
          <h4 className="font-bold text-white">
            {t("footer.account.title")}
          </h4>

          <ul className="space-y-2">
            <li>
              <Link
                to="/login"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.account.login")}
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.account.signup")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex-col-start gap-4">
          <h4 className="font-bold text-white">
            {t("footer.legal.title")}
          </h4>

          <ul className="space-y-2">
            <li>
              <a
                href="#privacy"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.legal.privacy")}
              </a>
            </li>

            <li>
              <a
                href="#terms"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.legal.terms")}
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="text-white/70 hover:text-white transition-colors"
              >
                {t("footer.legal.contact")}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="w-full border-t border-[#D9D9D9] py-8">
        <p className="text-center text-white/70">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}