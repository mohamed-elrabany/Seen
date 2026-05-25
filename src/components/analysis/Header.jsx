import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Header from "../layout/Header";
import HeaderCards from "../ui/HeaderCards";

import { FiTarget } from "react-icons/fi";
import { LuChartColumn } from "react-icons/lu";


import { headerCardsContent as cards } from "../../util/content";

export default function AnalysisHeader({analysisData}) {
  const { t } = useTranslation();

  const cards=[
    {
        icon: FiTarget,
        value: analysisData?.a1c || "6.6%",
        label: "A1C تقديري"
    },
    {
        icon: LuChartColumn,
        value: analysisData?.readings || "82",
        label: "قراءات"
    },
  ];


  return (
    <Header className="flex-col-between">
      <div className="w-full flex-col-start gap-4 mb-6">
        <div className="flex-center gap-4">
            <div className="p-4 rounded-full bg-[#161A41]/40 flex-center ">
                <LuChartColumn className="text-white w-6 h-6" />
            </div>
            <h2 className="text-white mb-0">
                التحليل و التقارير
            </h2>
        </div>
        <p className="text-white">
          تحليل شامل لبياناتك الصحية
        </p>
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
              // This correctly resolves homePage.header.cards.currentReading etc.
              label={t(card.label)}
            />
          </motion.div>
        ))}
      </motion.div>
    </Header>
  );
}