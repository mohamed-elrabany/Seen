import { IoIosArrowRoundBack } from "react-icons/io";
import heroImg from "../assets/heroSectionImg.jpg";
import analysisReport from "../assets/analysis-report.svg";
import postImg from "../assets/postImg.svg";
import { PiPulseBold } from "react-icons/pi";
import { IoBarChart } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { HiHeart } from "react-icons/hi";
import { features, testimonials } from "../util/content";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const categories = t("landingPage.community.categories", {
    returnObjects: true,
  });
  const isLtr = i18n.language === "en";

  return (
    <main className="pt-32 bg-gradient-to-br from-[#F8F9FF] to-white overflow-x-hidden">
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
              className="flex-center gap-2 bg-[#6976EB] hover:bg-[#1F1A5F] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-bold rounded-xl transition-all"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#161A41]/60 to-transparent"></div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-6 bg-white flex-center p-3 md:p-4 gap-2 rounded-xl shadow-2xl">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ADB4F3]/60 rounded-full flex items-center justify-center">
              <PiPulseBold className="w-3 h-3 md:w-4 md:h-4 text-[#6976EB]" />
            </div>
            <div className="flex-col-start">
              <p className="meta-text">{t("landingPage.hero.avgSugar")}</p>
              <p className="text-lg md:text-2xl font-bold text-[#161A41]">
                128 mg/dL
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="flex-col-center">
          <h2>{t("landingPage.featuresSection.title")}</h2>
          <p className="description-text">
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
                className="flex-col-start border border-[#D9D9D9]/30 shadow-xl hover:shadow-2xl rounded-2xl p-8 group hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 bg-[#ADB4F3]/60 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-[#6976EB]" />
                </div>
                <h3>{t(feature.title)}</h3>
                <p className="card-text">{t(feature.description)}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-[#F8F9FF] to-white">
        <div>
          <h2>{t("landingPage.analytics.title")}</h2>
          <p className="description-text">
            {t("landingPage.analytics.description")}
          </p>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-col-start gap-4"
          >
            <div className="flex-start gap-4">
              <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-xl flex items-center justify-center shrink-0">
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-[#6976EB]" />
              </div>
              <div className="flex-col-start">
                <h4>{t("landingPage.analytics.a1cTitle")}</h4>
                <p className="card-text">
                  {t("landingPage.analytics.a1cDesc")}
                </p>
              </div>
            </div>
            <div className="flex-start gap-4">
              <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-xl flex items-center justify-center shrink-0">
                <IoBarChart className="w-6 h-6 text-[#6976EB]" />
              </div>
              <div className="flex-col-start">
                <h4>{t("landingPage.analytics.filterTitle")}</h4>
                <p className="card-text">
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
          className="grid gap-4 p-4 md:p-8 bg-white rounded-3xl shadow-2xl"
        >
          <div className="aspect-video flex-center overflow-hidden p-8 bg-gradient-to-br from-[#6976EB]/10 to-[#ADB4F3]/10 rounded-2xl">
            <img
              className="w-[60%] object-cover"
              src={analysisReport}
              alt="analysis vector image"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="bg-[#F8F9FF] rounded-xl p-4">
              <p className="card-text">
                {t("landingPage.analytics.timeRange")}
              </p>
              <p className="text-base md:text-xl font-bold text-[#6976EB]">
                85%
              </p>
            </div>
            <div className="bg-[#F8F9FF] rounded-xl p-4">
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
          <p className="description-text">
            {t("landingPage.community.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg flex-col-start gap-8 border border-[#D9D9D9]/30 p-8 rounded-2xl"
          >
            <div className="flex-start gap-4">
              <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center justify-center shrink-0">
                <IoPerson className="w-6 h-6 text-[#6976EB]" />
              </div>
              <div className="flex-col-start">
                <p className="text-[#161A41] text-sm sm:text-base font-bold">
                  {t("landingPage.community.post.name")}
                </p>
                <p className="text-[#808080] text-xs sm:text-sm">
                  {t("landingPage.community.post.time")}
                </p>
              </div>
            </div>
            <div className="flex-col-start gap-4">
              <div className="rounded-2xl w-full h-48 sm:h-64 overflow-hidden">
                <img
                  src={postImg}
                  alt="post image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#3B3D53] mb-2">
                  {t("landingPage.community.post.title")}
                </h3>
                <p className="text-[#3B3D53] text-sm sm:text-base">
                  {t("landingPage.community.post.content")}
                </p>
              </div>
            </div>
            <div className="flex-start w-full gap-4 pt-3 border-t border-[#D9D9D9]/50">
              <button className="flex-center text-[#808080] w-auto gap-2 hover:text-[#6976EB] transition-colors">
                <FaRegHeart className="w-5 h-5" />
                <span>30.1K</span>
              </button>
              <button className="flex-center w-auto gap-2 text-[#808080] hover:text-[#6976EB] transition-colors">
                <FaRegComment className="w-5 h-5" />
                <span>1.2K</span>
              </button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-[#D9D9D9]/30"
          >
            <h3>{t("landingPage.community.categoriesTitle")}</h3>
            <div className="space-y-3">
              {categories.map((type, index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-3 rounded-xl transition-all text-sm sm:text-base ${
                    index === 2
                      ? "bg-[#6976EB] text-white font-bold"
                      : "bg-[#F8F9FF] text-[#808080] hover:bg-[#ADB4F3]/20"
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
      <section className="bg-gradient-to-br mb-24 from-[#F8F9FF] to-white flex-col-center gap-8">
        <div className="w-20 h-20 bg-gradient-to-t from-[#6976EB] to-[#2B3695] rounded-full flex items-center justify-center">
          <HiHeart className="w-10 h-10 text-white" />
        </div>
        <div className="flex-col-center">
          <h2>{t("landingPage.donation.title")}</h2>
          <p className="description-text">
            {t("landingPage.donation.description")}
          </p>
        </div>
        <Button className="bg-primary hover:bg-[#1F1A5F] px-12 py-3 text-white">
          <BiDollar className="text-white w-6 h-6" />
          <p>{t("landingPage.donation.button")}</p>
        </Button>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white flex-col-center gap-8">
        <div className="flex-col-center">
          <h2>{t("landingPage.testimonials.title")}</h2>
          <p className="description-text">
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
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#D9D9D9]/30 flex flex-col"
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
                <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center justify-center shrink-0">
                  <IoPerson className="w-6 h-6 text-[#6976EB]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#161A41]">
                    {t(testimonial.name)}
                  </h4>
                  <p className="text-[#808080] text-xs sm:text-sm">
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
