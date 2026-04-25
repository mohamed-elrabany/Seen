import { IoIosArrowRoundBack } from "react-icons/io";
import heroImg from "../../assets/heroSectionImg.jpg";
import analysisReport from "../../assets/analysis-report.svg";
import postImg from "../../assets/postImg.svg";
import { PiPulseBold } from "react-icons/pi";
import { IoBarChart } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";
import { HiHeart } from "react-icons/hi";
import { features, testimonials } from "../../util/content";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const categories = t("landingPage.community.categories", {
    returnObjects: true,
  });
  const isLtr = i18n.language === "en";

  return (
    <main className="pt-32 bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F] overflow-x-hidden">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1>{t("landingPage.hero.title")}</h1>
          <p className="description-text">
            {t("landingPage.hero.description")}
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link
              to="/register"
              className="flex-center gap-2 bg-[#6976EB] hover:gap-4 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-bold rounded-xl transition-all"
            >
              {t("landingPage.hero.start")}
              <IoIosArrowRoundBack
                className={`${isLtr && "rotate-180"} w-5 h-5 md:w-7 md:h-7`}
              />
            </Link>
            <a
              href="#features"
              className="flex-center gap-2 border-2 border-[#6976EB] text-[#6976EB] hover:bg-[#6976EB] hover:text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-xl transition-all"
            >
              {t("landingPage.hero.learnMore")}
            </a>
          </div>
        </motion.div>

        {/* Image section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-visible"
        >
          <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[500px] shadow-2xl rounded-3xl overflow-hidden">
            <img
              src={heroImg}
              alt="hero-section image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161A41]/60 to-transparent dark:from-[#161A41]/60 dark:to-transparent"></div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-6 dark:bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F] flex-center p-3 md:p-4 gap-2 rounded-xl shadow-2xl">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#6976EB]/20 rounded-full flex items-center justify-center">
              <PiPulseBold className="w-3 h-3 md:w-4 md:h-4 text-[#6976EB]" />
            </div>
            <div className="flex-col-start">
              <p className="meta-text">{t("landingPage.hero.avgSugar")}</p>
              <p className="text-lg md:text-2xl font-bold text-[#161A41] dark:text-white">
                128 mg/dL
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="flex-col-center">
          <h2 className="text-[#161A41] dark:text-white">
            {t("landingPage.featuresSection.title")}
          </h2>
          <p className="description-text text-[#808080] dark:text-gray-400">
            {t("landingPage.featuresSection.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-col-start border shadow-xl hover:shadow-2xl rounded-2xl p-8 group hover:-translate-y-1 transition-all
                bg-white bg-none border-[#D9D9D9]/30
                dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
              >
                <div className="w-16 h-16 bg-[#6976EB]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-[#6976EB]" />
                </div>
                <h3 className="text-[#3B3D53] dark:text-white">
                  {t(feature.title)}
                </h3>
                <p className="card-text text-[#808080] dark:text-gray-400">
                  {t(feature.description)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Analytics Section */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center 
  bg-gradient-to-br from-[#F8F9FF] to-white 
  dark:from-[#161A41] dark:to-[#1F1A5F] transition-colors duration-300"
      >
        <div>
          <h2 className="text-[#161A41] dark:text-white">
            {t("landingPage.analytics.title")}
          </h2>
          <p className="description-text dark:text-gray-300">
            {t("landingPage.analytics.description")}
          </p>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-col-start gap-4 mt-8"
          >
            <div className="flex-start gap-4">
              <div className="w-12 h-12 bg-[#6976EB]/20 rounded-xl flex items-center justify-center shrink-0">
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-[#6976EB]" />
              </div>
              <div className="flex-col-start">
                <h4 className="text-[#161A41] dark:text-white font-bold">
                  {t("landingPage.analytics.a1cTitle")}
                </h4>
                <p className="card-text dark:text-gray-400">
                  {t("landingPage.analytics.a1cDesc")}
                </p>
              </div>
            </div>

            <div className="flex-start gap-4">
              <div className="w-12 h-12 bg-[#6976EB]/20 rounded-xl flex items-center justify-center shrink-0">
                <IoBarChart className="w-6 h-6 text-[#6976EB]" />
              </div>
              <div className="flex-col-start">
                <h4 className="text-[#161A41] dark:text-white font-bold">
                  {t("landingPage.analytics.filterTitle")}
                </h4>
                <p className="card-text dark:text-gray-400">
                  {t("landingPage.analytics.filterDesc")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-4 p-4 md:p-8 dark:backdrop-blur-sm rounded-3xl shadow-2xl border
    bg-white bg-none border-[#D9D9D9]/30
      dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
        >
          <div className="aspect-video flex-center overflow-hidden p-8 bg-gradient-to-br from-[#6976EB]/10 to-[#ADB4F3]/10 dark:from-[#6976EB]/20 dark:to-[#ADB4F3]/5 rounded-2xl">
            <img
              className="w-[60%] object-cover"
              src={analysisReport}
              alt="analysis vector image"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="bg-[#F8F9FF] dark:bg-[#6976EB]/10 rounded-xl p-4">
              <p className="card-text dark:text-gray-300">
                {t("landingPage.analytics.timeRange")}
              </p>
              <p className="text-base md:text-xl font-bold text-[#6976EB]">
                85%
              </p>
            </div>
            <div className="bg-[#F8F9FF] dark:bg-[#6976EB]/10 rounded-xl p-4">
              <p className="card-text">{t("landingPage.analytics.avgSugar")}</p>
              <p className="text-base md:text-xl font-bold text-[#6976EB]">
                142
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Community Section */}
      <section id="community" className="flex-col-center gap-8">
        <div className="flex-col-center">
          <h2>{t("landingPage.community.title")}</h2>
          <p className="description-text text-center">
            {t("landingPage.community.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full shadow-lg flex-col-start gap-8 border p-6 md:p-8 rounded-2xl
    bg-white bg-none border-[#D9D9D9]/30
    dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
          >
            {/* User info & Category Badge */}
            <div className="flex justify-between items-start sm:items-center w-full">
              <div className="flex-start gap-4">
                {/* profileBorderColor logic for type1 (red) */}
                <div className="w-12 h-12 border-2 border-2 border-red-700 dark:border-red-400 bg-[#6976EB]/20 rounded-full flex items-center overflow-hidden justify-center shrink-0">
                  <IoPerson className="w-6 h-6 text-[#6976EB]" />
                </div>
                <div className="flex-col-start">
                  <p className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold">
                    {t("landingPage.community.post.name")}
                  </p>
                  <p className="text-[#808080] dark:text-gray-400 text-xs sm:text-sm">
                    {t("landingPage.community.post.time")}
                  </p>
                </div>
              </div>

              {/* Category Tag: type1*/}
              <p className="px-4 py-2 text-center text-xs md:text-sm rounded-full font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 capitalize">
                {t("communityPage.shared.categories.type1")}
              </p>
            </div>

            {/* Content Section */}
            <div className="flex-col-start gap-4 w-full">
              <div className="rounded-2xl w-full h-48 sm:h-64 overflow-hidden">
                <img
                  src={postImg}
                  alt="post image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#161A41] dark:text-white mb-2">
                  {t("landingPage.community.post.title")}
                </h3>
                <p className="text-[#3B3D53] dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {t("landingPage.community.post.content")}
                </p>
              </div>
            </div>

            {/* Post Status Section */}
            <div className="flex-start w-full gap-6 pt-3 border-t border-[#D9D9D9]/50">
              <button className="flex-center text-[#808080] dark:text-gray-400 w-auto gap-2 hover:text-red-500 transition-colors cursor-pointer">
                <FaRegHeart className="w-5 h-5" />
                <span className="font-medium">30.1K</span>
              </button>
              <button className="flex-center w-auto gap-2 text-[#808080] dark:text-gray-400 hover:text-[#6976EB] transition-colors cursor-pointer">
                <FaRegComment className="w-5 h-5" />
                <span className="font-medium">1.2K</span>
              </button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="    bg-white bg-none border-[#D9D9D9]/30
            dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10
            p-8 rounded-2xl shadow-lg border"
          >
            <h3>{t("landingPage.community.categoriesTitle")}</h3>
            <div className="space-y-3">
              {categories.map((type, index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-3 rounded-xl transition-all text-sm sm:text-base ${
                    index === 2
                      ? "bg-[#6976EB] text-white hover:bg-[#6976EB]/90 font-bold"
                      : "bg-[#F8F9FF] dark:bg-white/10 text-[#808080] dark:text-white hover:bg-[#ADB4F3]/20 font-medium"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full rounded-2xl flex-between p-8 bg-gradient-to-r from-[#6976EB] to-[#2B3695]"
        >
          <div>
            <h2 className="text-white text-lg sm:text-xl font-bold mb-2">
              {t("landingPage.community.doctors.title")}
            </h2>
            <p className="text-white text-sm sm:text-base">
              {t("landingPage.community.doctors.description")}
            </p>
          </div>
          <div className="w-20 h-20 bg-[#ffffff]/30 rounded-full flex items-center justify-center shrink-0">
            <IoMdCheckmarkCircleOutline className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </section>

      {/* Donation Section */}
      <section
        className="bg-gradient-to-br flex-col-center gap-8 
        bg-gradient-to-br from-[#F8F9FF] to-white 
      dark:from-[#1F1A5F] dark:to-[#161A41]"
      >
        <div className="w-20 h-20 bg-gradient-to-t from-[#6976EB] to-[#2B3695] rounded-full flex items-center justify-center">
          <HiHeart className="w-10 h-10 text-white" />
        </div>
        <div className="flex-col-center">
          <h2>{t("landingPage.donation.title")}</h2>
          <p className="description-text text-center">
            {t("landingPage.donation.description")}
          </p>
        </div>
        <Button className="bg-primary hover:bg-[#1F1A5F] px-12 py-3 text-white">
          <BiDollar className="text-white w-6 h-6" />
          <p>{t("landingPage.donation.button")}</p>
        </Button>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="flex-col-center gap-8">
        <div className="flex-col-center">
          <h2>{t("landingPage.testimonials.title")}</h2>
          <p className="description-text text-center">
            {t("landingPage.testimonials.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white bg-none border-[#D9D9D9]/30
                dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10
              p-8 rounded-2xl shadow-lg border border-[#D9D9D9]/30 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-[#FFD700]" />
                ))}
              </div>

              {/* Text */}
              <p className="card-text flex-grow">{t(testimonial.text)}</p>

              {/* Profile */}
              <div className="flex items-center gap-4 mt-6">
                <div className="w-12 h-12 bg-[#6976EB]/20 rounded-full flex items-center justify-center shrink-0">
                  <IoPerson className="w-6 h-6 text-[#6976EB]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#161A41] dark:text-white">
                    {t(testimonial.name)}
                  </h4>
                  <p className="text-[#808080] dark:text-gray-400 text-xs sm:text-sm">
                    {t(testimonial.type)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex-col-center bg-gradient-to-r from-[#6976EB] to-[#2B3695]">
        <div className="flex-col-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("landingPage.cta.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-8">
            {t("landingPage.cta.description")}
          </p>
        </div>
        <Link
          to="/register"
          className="flex-center gap-2 hover:gap-6 bg-white hover:shadow-xl px-6 py-3 text-sm sm:text-base text-[#6976EB] font-bold rounded-xl transition-all"
        >
          {t("landingPage.cta.button")}
          <IoIosArrowRoundBack
            className={`w-5 h-5 md:w-7 md:h-7 ${isLtr && "rotate-180"}`}
          />
        </Link>
      </section>
    </main>
  );
}
