import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Header from "../layout/Header";
import HeaderCards from "../ui/HeaderCards";
import Button from "../ui/Button";

import { FiTarget } from "react-icons/fi";
import { LuChartColumn } from "react-icons/lu";

import { headerCardsContent as cards } from "../../util/content";

export default function AnalysisHeader({ analysisData }) {
  const { t } = useTranslation();

  const cards = [
    {
      icon: FiTarget,
      value: analysisData?.a1cEstimation ? `${analysisData.a1cEstimation}%` : "6.2%",
      label: "analysis.header.a1c"
    },
    {
      icon: LuChartColumn,
      value: analysisData?.totalReadings || "82",
      label: "analysis.header.readings"
    },
  ];

  return (
    <Header className="flex-col-between">
      <div className="w-full flex flex-col justify-start items-center lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="w-auto lg:w-full flex-col-start gap-4 mb-6">
          <div className="flex-center gap-4">
            <div className="p-4 rounded-full bg-[#161A41]/40 flex-center ">
              <LuChartColumn className="text-white w-6 h-6" />
            </div>
            {/* Main Title Updated */}
            <h2 className="text-white mb-0">
              {t("analysis.header.title")}
            </h2>
          </div>
          {/* Subtitle Updated */}
          <p className="text-white">
           {t("analysis.header.description")}
          </p>
        </div>
        
        {/* Action Button Label Updated */}
        <Button
          className="cursor-pointer border border-white/10 bg-white/10 w-full lg:w-auto text-white rounded-lg p-4 whitespace-nowrap"
        >
          <p className="text-white w-full">{t("analysis.header.button")}</p>
        </Button>
      </div>

      <motion.div
        // ... motion props
        className="w-full grid grid-cols-2 gap-4"
      >
        {cards.map((card, index) => (
          <motion.div key={index} /* ... motion variants */ >
            <HeaderCards
              icon={card.icon}
              value={card.value}
              label={t(card.label)}
            />
          </motion.div>
        ))}
      </motion.div>
    </Header>
  );
}