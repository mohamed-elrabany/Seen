import Input from "../../../components/ui/Input";
import RadioButton from "../../../components/ui/RadioButton";
import { IoMdMan, IoMdWoman } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Step2({ data, setData, isStepValid }) {
  const { t } = useTranslation();
  const [touched, setTouched] = useState({});

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  useEffect(() => {
    // Validation Logic
    const isGenderValid = !!data.gender;
    const isBirthDateValid = !!data.birthDate;
    
    // Weight between 20kg and 300kg
    const isWeightValid = data.weight >= 20 && data.weight <= 300;
    
    // Height between 50cm and 250cm
    const isHeightValid = data.height >= 50 && data.height <= 250;

    isStepValid(isGenderValid && isBirthDateValid && isWeightValid && isHeightValid);
  }, [data, isStepValid]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#161A41] mb-8">
        {t("registerPage.step2.title")}
      </h2>
      
      <div className="grid gap-6">
        {/* Gender Selection */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <RadioButton
            id="male"
            name="gender"
            value="Male" // Changed to lowercase to match your isChecked logic
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            isChecked={data.gender === "Male"}
          >
            <IoMdMan className="w-10 h-10" />
            <p>{t("registerPage.step2.inputs.gender.male")}</p>
          </RadioButton>
          
          <RadioButton
            id="female"
            name="gender"
            value="Female" // Changed to lowercase to match your isChecked logic
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            isChecked={data.gender === "Female"}
          >
            <IoMdWoman className="w-10 h-10" />
            <p>{t("registerPage.step2.inputs.gender.female")}</p>
          </RadioButton>
        </div>

        {/* Birth Date */}
        <Input
        name={'birthDate'}
          id="birthDate"
          label={t("registerPage.step2.inputs.birthDate.label")}
          type="date"
          value={data.birthDate}
          onBlur={() => handleBlur("birthDate")}
          onChange={(e) => setData({ ...data, birthDate: e.target.value })}
          error={touched.birthDate && !data.birthDate ? "Please select your birth date" : false}
        />

        {/* Weight */}
        <Input
          name={'weight'}
          id="weight"
          label={t("registerPage.step2.inputs.weight.label")}
          type="number"
          value={data.weight}
          onBlur={() => handleBlur("weight")}
          onChange={(e) => setData({ ...data, weight: e.target.value })}
          placeholder={t("registerPage.step2.inputs.weight.placeholder")}
          error={
            touched.weight && data.weight && (data.weight < 20 || data.weight > 300)
              ? "Please enter a valid weight (20-300 kg)"
              : false
          }
        />

        {/* Height */}
        <Input
          name={'height'}
          id="height"
          label={t("registerPage.step2.inputs.height.label")}
          type="number"
          value={data.height}
          onBlur={() => handleBlur("height")}
          onChange={(e) => setData({ ...data, height: e.target.value })}
          placeholder={t("registerPage.step2.inputs.height.placeholder")}
          error={
            touched.height && data.height && (data.height < 50 || data.height > 250)
              ? "Please enter a valid height (50-250 cm)"
              : false
          }
        />
      </div>
    </div>
  );
}