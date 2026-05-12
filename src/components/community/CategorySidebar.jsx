import RadioButton from "../ui/RadioButton";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CategorySidebar({
  checkedCategory,
  setCheckedCategory,
}) {
  const { t } = useTranslation();
  const categories = [
    {
      id: "General",
      name: "general",
      value: t("communityPage.shared.categories.general"),
    },
    {
      id: "Type1 / LADA",
      name: "type1",
      value: `${t("communityPage.shared.categories.type1")} / ${t("communityPage.shared.categories.lada")}`,
    },
    {
      id: "Type2",
      name: "type2",
      value: t("communityPage.shared.categories.type2"),
    },
    {
      id: "MODY",
      name: "mody",
      value: t("communityPage.shared.categories.mody"),
    },
    {
      id: "Gestational",
      name: "Gestational",
      value: t("communityPage.shared.categories.gestational"),
    },
    {
      id: "Advices",
      name: "advices",
      value: t("communityPage.shared.categories.advices"),
    },
  ];

  return (
    <aside
      className="
      sticky top-8 z-10 w-full overflow-x-auto no-scrollbar
      w-full h-fit shadow-lg gap-8 border p-4 md:p-6 rounded-2xl
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
    >
      <h3 className="hidden lg:block font-bold mb-4">{t("common.categories")}</h3>
      <div className="flex flex-row lg:grid gap-4 min-w-max lg:min-w-0">
        {categories.map((category, index) => (
          <RadioButton
            key={index}
            id={category.id}
            name="category-group"
            value={category.value}
            onChange={() => setCheckedCategory(category.id)}
            isChecked={category.id === checkedCategory}
          >
            {category.value}
          </RadioButton>
        ))}
      </div>
    </aside>
  );
}
