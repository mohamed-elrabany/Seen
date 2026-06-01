import Input from "../../ui/Input";
import RadioButton from "../../ui/RadioButton";

import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function EditForm() {
  const { t } = useTranslation();
  const [checkedCategory, setCheckedCategory] = useState(null);

  const diabetesTypes = [
    { id: "Type1", label: "communityPage.shared.categories.type1" },
    { id: "Type2", label: "communityPage.shared.categories.type2" },
    { id: "LADA", label: "communityPage.shared.categories.lada" },
    { id: "MODY", label: "communityPage.shared.categories.mody" },
    { id: "Gestational", label: "communityPage.shared.categories.gestational" },
  ];
  const insulin_therapy_options = [
    { id: "pen_syringes", value: "Pen / Syringes", label: "Pen / Syringes" },
    { id: "pump", value: "pump", label: "Pump" },
    { id: "no-insulin", value: "No insulin", label: "No insulin" },
  ];
  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center gap-5
        bg-white bg-none border-2 shadow-lg
        border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10
        transition-all duration-200"
    >
      <div className="w-full grid md:grid-cols-2 gap-4">
        <Input label="First Name" placeholder="John" />
        <Input label="Last Name" placeholder="Doe" />
      </div>
      <Input
        label="Email"
        disabled
        type="email"
        placeholder="email@example.com"
      />
      <Input label="Date of Birth" type="date" />

      <div className="w-full grid md:grid-cols-2 gap-4">
        <Input label="Weight" type="number" placeholder="eg. 65 kg" />
        <Input label="Height" type="number" placeholder="eg. 160 cm" />
      </div>
      {/* Categories */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer">
          {t("communityPage.add-edit-post.categoryLabel")}
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {diabetesTypes.map((type) => (
            <RadioButton
              key={type.value}
              id={type.value}
              name="diabetes_type"
              value={type.value}
              onChange={() => setCheckedCategory(type.id)}
              isChecked={checkedCategory === type.id}
            >
              {t(type.label)}
            </RadioButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer">
          {t("communityPage.add-edit-post.categoryLabel")}
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {insulin_therapy_options.map((type) => (
            <RadioButton
              key={type.value}
              id={type.value}
              name="insulin_therapy"
              value={type.value}
              onChange={() => setCheckedCategory(type.id)}
              isChecked={checkedCategory === type.id}
            >
              {t(type.label)}
            </RadioButton>
          ))}
        </div>
      </div>
    </div>
  );
}
