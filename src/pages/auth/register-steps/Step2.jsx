import Input from "../../../components/ui/Input";
import RadioButton from "../../../components/ui/RadioButton";

import { IoMdMan } from "react-icons/io";
import { IoMdWoman } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step2({ data, setData, isStepValid }) {
  const {t}= useTranslation();
  useEffect(()=>{
      if(
        data.gender && data.weight &&
        data.birthDate && data.height
      ){
        isStepValid(true);
      }else{
        isStepValid(false);
      }
    },[data]);
    
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#161A41] mb-8">{t('registerPage.step2.title')}</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <RadioButton
            id="male"
            name="gender"
            value="Male"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            isChecked={data.gender === 'male'}
          >
            <IoMdMan className="w-10 h-10" />
            <p>{t('registerPage.step2.inputs.gender.male')}</p>
          </RadioButton>
          <RadioButton
            id="female"
            name="gender"
            value="Female"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            isChecked={data.gender === 'female'}
          >
            <IoMdWoman className="w-10 h-10" />
            <p>{t('registerPage.step2.inputs.gender.female')}</p>
          </RadioButton>
        </div>
        <Input
          id="birthDate"
          value={data.birthDate}
          onChange={(e) => setData({ ...data, birthDate: e.target.value })}
          label={t('registerPage.step2.inputs.birthDate.label')}
          type="date"
          name="birthDate"
          placeholder={t('registerPage.step2.inputs.birthDate.placeholder')}
        />
        <Input
          id="weight"
          value={data.weight}
          onChange={(e) => setData({ ...data, weight: e.target.value })}
          label={t('registerPage.step2.inputs.weight.label')}
          type="text"
          name="weight"
          placeholder={t('registerPage.step2.inputs.weight.placeholder')}
        />
        <Input
          id="height"
          value={data.height}
          onChange={(e) => setData({ ...data, height: e.target.value })}
          label={t('registerPage.step2.inputs.height.label')}
          type="text"
          name="height"
          placeholder={t('registerPage.step2.inputs.height.placeholder')}
        />
      </div>
    </div>
  );
}
