import Input from "../../ui/Input";
import RadioButton from "../../ui/RadioButton";

import { useTranslation } from "react-i18next";
import { useState } from "react";

import { IoMdMan, IoMdWoman } from "react-icons/io";

export default function EditForm({ userData, setUserData, errors = {}, submitAttempted = false }) {
  const { t } = useTranslation();

  const [touched, setTouched] = useState({});
  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  function shouldShowError(fieldName) {
    return Boolean(submitAttempted || touched[fieldName]);
  }

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

  const genderOptions = [
    { id: "male", value: "Male", label: "Male", icon: IoMdMan },
    { id: "female", value: "Female", label: "Female", icon: IoMdWoman },
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleRadioChange(e) {
    handleBlur(e.target.name);
    handleInputChange(e);
  }

  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center gap-5
        bg-white bg-none border-2 shadow-lg
        border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10
        transition-all duration-200"
    >
      <div className="w-full grid md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="first_name"
          value={userData.first_name ?? ""}
          placeholder="John"
          onBlur={() => handleBlur("first_name")}
          onChange={handleInputChange}
          error={shouldShowError("first_name") ? errors.first_name : false}
        />
        <Input
          label="Last Name"
          name="last_name"
          value={userData.last_name ?? ""}
          placeholder="Doe"
          onBlur={() => handleBlur("last_name")}
          onChange={handleInputChange}
          error={shouldShowError("last_name") ? errors.last_name : false}
        />
      </div>
      <Input
        value={userData.email ?? ""}
        label="Email"
        disabled
        type="email"
        name="email"
        placeholder="email@example.com"
        className="cursor-not-allowed dark:bg-white/5 bg-[#808080]/20"
      />

      <Input
        value={userData.phone ?? ""}
        label="Phone"
        name="phone"
        onChange={handleInputChange}
        type="text"
        onBlur={() => handleBlur("phone")}
        error={shouldShowError("phone") ? errors.phone : false}
      />
      <Input
        value={userData.birthDate ?? ""}
        label="Date of Birth"
        name="birthDate"
        type="date"
        onBlur={() => handleBlur("birthDate")}
        onChange={handleInputChange}
        error={shouldShowError("birthDate") ? errors.birthDate : false}
      />

      <div className="w-full grid md:grid-cols-2 gap-4">
        <Input
          value={userData.weight ?? ""}
          label="Weight"
          type="number"
          name="weight"
          placeholder="eg. 65 kg"
          onBlur={() => handleBlur("weight")}
          onChange={handleInputChange}
          error={shouldShowError("weight") ? errors.weight : false}
        />
        <Input
          value={userData.height ?? ""}
          label="Height"
          type="number"
          name="height"
          placeholder="eg. 160 cm"
          onBlur={() => handleBlur("height")}
          onChange={handleInputChange}
          error={shouldShowError("height") ? errors.height : false}
        />
      </div>
      <div className="w-full grid md:grid-cols-2 gap-4">
        <Input
          disabled
          className="cursor-not-allowed dark:bg-white/5 bg-[#808080]/20"
          value={"mg/dl"}
          label="Blood Sugar Unit"
          type="text"
          placeholder="eg. mg/dl"
        />
        <Input
          disabled
          className="cursor-not-allowed dark:bg-white/5 bg-[#808080]/20"
          value={"Grams"}
          label="Carbohydrates Unit"
          type="text"
          name="carbohydrates_unit"
          placeholder="eg. grams"
        />
      </div>
      {/* Categories */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer">
          {t("communityPage.add-edit-post.categoryLabel")}
        </label>

        <div className="grid grid-cols-2 gap-4">
          {genderOptions.map((type) => (
            <RadioButton
              key={type.value}
              id={type.value}
              name="gender"
              value={type.value}
              onChange={handleRadioChange}
              isChecked={userData.gender === type.value}
            >
              <type.icon className="w-10 h-10" />
              <p>{t(`registerPage.step2.inputs.gender.${type.id}`)}</p>
            </RadioButton>
          ))}
        </div>

        {shouldShowError("gender") && errors.gender && (
          <p className="text-red-600 mt-1 text-xs sm:text-sm font-medium">{errors.gender}</p>
        )}
      </div>

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
              value={type.id}
              onChange={handleRadioChange}
              isChecked={userData.diabetes_type === type.id}
            >
              {t(type.label)}
            </RadioButton>
          ))}
        </div>

        {shouldShowError("diabetes_type") && errors.diabetes_type && (
          <p className="text-red-600 mt-1 text-xs sm:text-sm font-medium">{errors.diabetes_type}</p>
        )}
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
              onChange={handleRadioChange}
              isChecked={userData.insulin_therapy === type.value}
            >
              {t(type.label)}
            </RadioButton>
          ))}
        </div>

        {shouldShowError("insulin_therapy") && errors.insulin_therapy && (
          <p className="text-red-600 mt-1 text-xs sm:text-sm font-medium">{errors.insulin_therapy}</p>
        )}
      </div>
    </div>
  );
}
