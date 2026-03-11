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

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import SecondaryButton from "../components/ui/SecondaryButton";
import { motion } from "framer-motion";
import { HiHeart } from "react-icons/hi";
import { features, testimonials } from "../util/content";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t, i18n }= useTranslation();
  const categories = t("landingPage.community.categories", { returnObjects: true });
  const isLtr= i18n.language === "en";

  return (
    <div>
      <Navbar />
      <main className="pt-32 bg-gradient-to-br from-[#F8F9FF] to-white overflow-hidden">
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-[#161A41] mb-6">
              {t("landingPage.hero.title")}
            </h1>
            <p className="text-xl text-[#808080] mb-8">
             {t("landingPage.hero.description")}
            </p>
            <div className="flex-start gap-4">
              <Button className="bg-primary hover:bg-[#1F1A5F] px-6 py-3 text-white">
                <p>{t("landingPage.hero.start")}</p>
                <IoIosArrowRoundBack className={`${isLtr && "rotate-180"}`} size={32} />
              </Button>
              <SecondaryButton>
                <a href="#features">{t("landingPage.hero.learnMore")}</a>
              </SecondaryButton>
            </div>
          </motion.div>
          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[500px] shadow-2xl rounded-3xl overflow-hidden">
              <img
                src={heroImg}
                alt="hero-section image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161A41]/60 to-transparent"></div>
            </div>
            {/* floating section */}
            <div
              className="absolute  -bottom-6 -right-6
            bg-white flex-center p-4 gap-2 rounded-xl shadow-2xl"
            >
              <div className="w-8 h-8 bg-[#ADB4F3]/60 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PiPulseBold className="w-4 h-4 text-[#6976EB]" />
              </div>
              <div className="flex-col-start">
                <p className="text-sm text-[#808080]">{t("landingPage.hero.avgSugar")}</p>
                <p className="text-2xl font-bold text-[#161A41]">128 mg/dL</p>
              </div>
            </div>
          </motion.div>
        </section>
        {/* Features Section */}
        <section id="features">
          <div className="flex-col-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#161A41] mb-6">
              {t("landingPage.featuresSection.title")}
            </h1>
            <p className="text-xl text-[#808080] mb-8">
              {t("landingPage.featuresSection.description")}
            </p>
          </div>
          <div
            className=" grid 
            md:grid-cols-2 md: gap-2
            lg:grid-cols-3 gap-8"
          >
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
                  <h3 className="text-2xl font-bold text-[#3B3D53] mb-3">
                    {t(feature.title)}
                  </h3>
                  <p className="text-[#808080]">{t(feature.description)}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-[#F8F9FF] to-white">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#161A41] mb-6">
              {t("landingPage.analytics.title")}
            </h1>
            <p className="text-xl text-[#808080] mb-8">
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
                <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IoMdCheckmarkCircleOutline className="w-6 h-6 text-[#6976EB]" />
                </div>
                <div className="flex-col-start">
                  <h4 className="text-xl font-bold text-[#3B3D53] mb-3">
                     {t("landingPage.analytics.a1cTitle")} 
                  </h4>
                  <p className="text-md text-[#808080]">
                    {t("landingPage.analytics.a1cDesc")}
                  </p>
                </div>
              </div>
              <div className="flex-start gap-4">
                <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IoBarChart className="w-6 h-6 text-[#6976EB]" />
                </div>
                <div className="flex-col-start">
                  <h4 className="text-xl font-bold text-[#3B3D53] mb-3">
                    {t("landingPage.analytics.filterTitle")}
                  </h4>
                  <p className="text-md text-[#808080]">
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
            className="grid gap-4 p-8 bg-white rounded-3xl shadow-2xl"
          >
            <div className="aspect-video flex-center overflow-hidden p-8 bg-gradient-to-br from-[#6976EB]/10 to-[#ADB4F3]/10 rounded-2xl">
              <img
                className="w-[60%] object-cover"
                src={analysisReport}
                alt="analysis vector image"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#F8F9FF] rounded-xl p-4">
                <p className="text-[#808080] mb-1 font-medium">{t("landingPage.analytics.timeRange")}</p>
                <p className="text-xl font-bold text-[#6976EB] ">85%</p>
              </div>
              <div className="bg-[#F8F9FF] rounded-xl p-4">
                <p className="text-[#808080] mb-1 font-medium">{t("landingPage.analytics.avgSugar")}</p>
                <p className="text-xl font-bold text-[#6976EB] ">142</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Community Section */}
        <section id="community" className="flex-col-center gap-8">
          <div className="flex-col-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#161A41] mb-6">
              {t("landingPage.community.title")}
            </h1>
            <p className="text-xl text-[#808080] mb-8">
              {t("landingPage.community.description")}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg flex-col-start gap-8 border border-[#D9D9D9]/30 p-8 rounded-2xl"
            >
              <div className="flex-start gap-4">
                <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IoPerson className="w-6 h-6 text-[#6976EB]" />
                </div>

                <div className="flex-col-start">
                  <p className="text-[#161A41] text-md font-bold">
                    {t("landingPage.community.post.name")}
                  </p>
                  <p className="text-[#808080] text-sm">{t("landingPage.community.post.time")}</p>
                </div>
              </div>
              <div className="flex-col-start gap-4">
                <div className="rounded-2xl w-full h-75 overflow-hidden">
                  <img
                    src={postImg}
                    alt="hero-section image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3B3D53] mb-3">
                    {t("landingPage.community.post.title")}
                  </h3>
                  <p className="text-[#3B3D53]">
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
                  <FaRegComment className="w-5 h-5 " />
                  <span>1.2K</span>
                </button>
              </div>
            </motion.div>

            {/* category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#D9D9D9]/30"
            >
              <h3 className="text-xl font-bold text-[#3B3D53] mb-6 font-['Cairo']">
                {t("landingPage.community.categoriesTitle")}
              </h3>
              <div className="space-y-3">
                {categories.map((type, index) => (
                  <button
                    key={index}
                    className={`w-full px-4 py-3 rounded-xl transition-all] ${
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
              <h2 className="text-white text-xl font-bold mb-2">
                {t("landingPage.community.doctors.title")}
              </h2>
              <p className="text-white">
                 {t("landingPage.community.doctors.description")}
              </p>
            </div>
            <div className="w-20 h-20 bg-[#ffffff]/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <IoMdCheckmarkCircleOutline className="w-10 h-10 text-white" />
            </div>
          </motion.div>
        </section>

        {/* Donnation section */}
        <section className="bg-gradient-to-br mb-24 from-[#F8F9FF] to-white flex-col-center gap-8">
          <div className="w-20 h-20 bg-gradient-to-t from-[#6976EB] to-[#2B3695] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <HiHeart className="w-10 h-10 text-white" />
          </div>
          <div className="flex-col-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#161A41] mb-6">
              {t("landingPage.donation.title")}
            </h1>
            <p className="text-xl text-[#808080] mb-8">
              {t("landingPage.donation.description")}
            </p>
          </div>
          <Button className="bg-primary hover:bg-[#1F1A5F] px-12 py-3 text-white">
            <BiDollar className="text-white w-6 h-6" />
            <p>{t("landingPage.donation.button")}</p>
          </Button>
        </section>

        {/* Testimonials Section  */}
        <section id="testimonials" className="bg-white flex-col-center gap-8">
          <div className="flex-col-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#161A41] mb-6">
                {t("landingPage.testimonials.title")}
            </h1>
            <p className="text-xl text-[#808080] mb-8">
              {t("landingPage.testimonials.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-[#D9D9D9]/30 flex flex-col"
                >
                  {/* stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-[#FFD700]" />
                    ))}
                  </div>

                  {/* text */}
                  <p className="text-[#808080] flex-grow">{t(testimonial.text)}</p>

                  {/* profile */}
                  <div className="flex items-center gap-4 mt-6">
                    <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IoPerson className="w-6 h-6 text-[#6976EB]" />
                    </div>

                    <div>
                      <h4 className="text-[#161A41] text-md font-bold">
                        {t(testimonial.name)}
                      </h4>
                      <p className="text-[#808080] text-sm">
                        {t(testimonial.type)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Sign up Section  */}
        <section className="flex-col-center bg-gradient-to-r from-[#6976EB] to-[#2B3695]">
          <div className="flex-col-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("landingPage.cta.title")}
            </h1>
            <p className="text-xl text-white mb-8">
              {t("landingPage.cta.description")}
            </p>
          </div>
          <Button className="bg-white px-6 py-3 hover:shadow-xl hover:gap-6 transition-all">
            <p className="text-[#6976EB]">{t("landingPage.cta.button")}</p>
            <IoIosArrowRoundBack className={`text-[#6976EB] w-8 h-8 ${isLtr && "rotate-180"}`} />
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
