import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../layout/Header";
import HeaderCards from "../ui/HeaderCards";

import { headerCardsContent as cards } from "../../util/content";

export default function HomeHeader() {
  const { t } = useTranslation();

  return (
    <Header className="flex-col-between">
      <div className="w-full flex-col-start gap-4 mb-6">
        <h1 className="text-white">
          {/* Path updated to homePage.header.welcome */}
          {t("homePage.header.welcome", { name: "منتصر" })}
        </h1>
        <p className="text-white">
          {t("homePage.header.summary")}
        </p>
      </div>

      <motion.div
        // ... motion props
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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